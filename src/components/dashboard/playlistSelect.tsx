"use client"

import React, { useState, useEffect } from "react"
import { toast } from "sonner"
import { FolderPlus, Music } from "lucide-react"
import { redirect } from "next/navigation"
import { useStore } from "@/lib/state"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { getPlaylists } from "@/lib/client"
import { Creating } from "./creating"

interface PlaylistSelectProps {}

export const PlaylistSelect: React.FC<PlaylistSelectProps> = ({ }) => {
    const accessToken = useStore((state) => state.accessToken)
    const userData = useStore((state) => state.userData)
    const playlists = useStore((state) => state.playlists)
    const setPlaylists = useStore((state) => state.setPlaylists)
    const selected = useStore((state) => state.selected)
    const setSelected = useStore((state) => state.setSelected)

    const [selecting, setSelecting] = useState(true)
    const [roomId, setRoomId] = useState<string | null>(null)

    useEffect(() => {
        if (accessToken) {
            getPlaylists({ accessToken }).then((res) => {
                if (res.length === 0) setPlaylists({})
                else setPlaylists(res.playlists)
            })
        }
    }, [accessToken, setPlaylists])

    const createRoom = async (id: string, user?: string) => {
        if (user) {
            const res = await fetch(`/api/createRoom?playlist=${id}&user=${user}`, {
                method: "POST",
            })
            const data = await res.json()
            setRoomId(data.roomId)
        }
    }

    const selectHandler = (id: string) => {
        setSelected(id)
        setSelecting(false)

        createRoom(id, userData?.id)
    }

    useEffect(() => {
        if (roomId) {
            redirect(`/editor/${roomId}`)
        }
    }, [roomId])

    // const playlists = {
    //     items: [
    //         {
    //             id: "playlist1",
    //             name: "My Favorite Songs",
    //             owner: {
    //                 id: "user123",
    //                 name: "John Doe"
    //             },
    //             public: true,
    //             images: [
    //                 {
    //                     url: ""
    //                 }
    //             ],
    //             tracks: [
    //                 { id: "track1", title: "Song A", artist: "Artist 1" },
    //                 { id: "track2", title: "Song B", artist: "Artist 2" }
    //             ]
    //         },
    //         {
    //             id: "playlist1",
    //             name: "My Favorite Songs",
    //             owner: {
    //                 id: "user123",
    //                 name: "John Doe"
    //             },
    //             public: true,
    //             images: [
    //                 {
    //                     url: ""
    //                 }
    //             ],
    //             tracks: [
    //                 { id: "track1", title: "Song A", artist: "Artist 1" },
    //                 { id: "track2", title: "Song B", artist: "Artist 2" }
    //             ]
    //         },
    //     ]
    // }

    // const userData = {
    //     name: "john",
    //     email: "johndoe@email.com",
    //     image: "",
    //     userExt: "johnexe",
    //     id: "user123",
    // }

    return (
        <div className="flex h-full min-w-[650px] flex-grow flex-col  items-start justify-start overflow-y-auto p-12">
            <div className="flex w-full items-center justify-between">
                <div className="text-3xl font-medium">Select A Playlist</div>
                <Button
                    onClick={() => {
                        toast.info("Coming soon!")
                    }}
                    disabled={!selecting}
                    className="text-base">
                    <FolderPlus className="mr-2 h-4 w-4" />
                    Create New
                </Button>
            </div>
            <div className=" mt-8 flex w-full max-w-screen-lg flex-wrap gap-4">
                {/* <div className="h-96 w-[900px] overflow-auto whitespace-pre text-xs">
                    {JSON.stringify(playlists, null, "\t")}
                </div> */}
                {selecting ? (
                    playlists ? (
                        playlists?.items?.map((playlist: any, i: number) => {
                        if (userData?.id !== playlist.owner.id || !playlist.public) return null
                        return (
                            <Button
                                key={i}
                                className="h-auto w-52 flex-col items-start justify-start rounded-lg p-3 text-base"
                                variant="subtle"
                                onClick={() => selectHandler(playlist.id)}>
                            <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-md bg-zinc-800">
                                {playlist.images[0]?.url ? (
                                    <Image
                                        src={playlist.images[0].url}
                                        alt="playlist image"
                                        fill
                                        sizes="250px"
                                        className="z-10 min-h-full min-w-full object-cover"
                                    />
                                ) : (
                                <div className="z-0 flex h-full w-full items-center justify-center">
                                    <Music className="h-12 w-12 text-white" />
                                </div>
                                )}
                            </div>
                            <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-left">
                                {playlist.name}
                            </div>
                            <div className="ellipsis mt-1 h-5 w-full overflow-hidden whitespace-nowrap text-left text-sm font-normal text-zinc-500">
                                {playlist.description ?? ""}
                            </div>
                            </Button>
                        )
                    })
                ) : (
                    <div className="text-zinc-500">
                        No Playlists Found. Create one to get started!
                    </div>
                )) : (
                <Creating
                    name = {
                        playlists?.items.find((item: any) => item.id === selected)?.name as string
                    }
                />
                )}
            </div>
        </div>
    )
}