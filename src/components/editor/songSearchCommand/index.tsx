import React, { useState, useEffect, Dispatch } from "react"
import Image from "next/image"
import { Search } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useSongSearchStore, useStore } from "@/lib/state"
import { songType } from "@/types/song"
import { searchSongs, addSong } from "@/lib/client"
  
export const SongSearchCommand = ({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: Dispatch<React.SetStateAction<boolean>>
}) => {
    useEffect(() => {
      const ctrlK = (e: KeyboardEvent) =>
        (e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")
  
      const handler = (e: KeyboardEvent) => {
        if (ctrlK(e)) {
          setOpen((open) => !open)
        }
      }
  
      const ignore = (e: KeyboardEvent) => {
        if (ctrlK(e)) e.preventDefault()
      }
  
      window.addEventListener("keydown", handler)
      window.addEventListener("keydown", ignore)
      return () => {
        window.removeEventListener("keydown", handler)
        window.removeEventListener("keydown", ignore)
      }
    }, [setOpen])
  
    const search = useSongSearchStore((state) => state.search)
    const setSearch = useSongSearchStore((state) => state.setSearch)
  
    const [query, setQuery] = useState<string>("")
    const [songResults, setSongResults] = useState<any[]>([])
    const accessToken = useStore((state) => state.accessToken)
    const songs = useStore((state) => state.songs)
    const setSongs = useStore((state) => state.setSongs)
    const selected = useStore((state) => state.selected)
  
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        setQuery(search)
        if (search) {
          searchSongs(search, accessToken, setSongResults)
        }
      }, 600)
  
      return () => clearTimeout(delayDebounceFn)
    }, [search, accessToken])
  
    const handleSelect = async ({ song }: { song: songType }) => {
      await addSong({
        playlist: selected,
        track: song,
        accessToken,
        songs,
        setSongs,
      })
    }
  
    const setMessageMode = useStore((state) => state.setMessageMode)
  
    useEffect(() => {
      if (open) {
        setMessageMode(false)
      }
    }, [open, setMessageMode])
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search songs on Spotify</DialogTitle>
          </DialogHeader>
          <div className="flex items-center border-b border-b-zinc-100 px-4">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search songs..."
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {query ? (
                <div className="w-80 overflow-hidden text-ellipsis whitespace-nowrap px-4 text-sm font-normal text-zinc-400">
                  Searching for:{" "}
                  <span className="font-bold underline underline-offset-2">
                    {query}
                  </span>
                </div>
            ) : (
              <div className="w-80 overflow-hidden text-ellipsis whitespace-nowrap px-4 text-sm font-normal text-zinc-400">
                -
              </div>
            )}
          </div>

          <div className="w-full">
          {query ? (
                  <div className="p-4 space-y-2">
                    {songResults && songResults.map((song: any, i: number) => (
                        <div
                          key={i}
                          onClick={() => {
                            setOpen(false)
                            handleSelect({
                              song: {
                                id: song.id,
                                title: song.name,
                                artist: song.artists[0].name,
                                cover: song.album.images[1].url,
                                artistExt: song.artists[0].external_urls.spotify,
                                songExt: song.external_urls.spotify,
                              },
                            })
                          }}
                          className="cursor-pointer rounded-md h-auto w-full flex items-center gap-2 p-2 transition duration-150 ease-in-out hover:bg-zinc-800"
                        >
                          <div className="relative mr-2.5 aspect-square h-10 overflow-hidden rounded-md bg-zinc-600 bg-cover">
                            {song?.album?.images?.[0]?.url ? (
                              <Image
                                className="min-h-full min-w-full object-cover"
                                src={song.album.images?.[0]?.url ?? ""}
                                alt=""
                                fill
                              />
                            ) : null}
                          </div>
                          <div>
                            <div className="-mb-0.5 w-72 overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm">
                              {song?.name ?? "No Song Name"}
                            </div>
                            <div className="flex w-72 items-center space-x-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-normal text-zinc-500">
                              {song?.artists?.map((artist: any, i: number) => (
                                <div key={artist.name + song?.name}>
                                  {artist.name +
                                    (i < song?.track?.artists?.length - 1
                                      ? ","
                                      : "")}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : null}
          </div>
        </DialogContent>
      </Dialog>
    )
} 