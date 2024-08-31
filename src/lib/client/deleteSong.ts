import { songType } from "@/types/song"

export const deleteSong = async ({
  playlist,
  track,
  accessToken,
  songs,
  setSongs,
}: {
  playlist: string
  track: songType
  accessToken: string
  songs: songType[]
  setSongs: (songs: songType[]) => void
}) => {
  const newSongs = songs.filter((song) => song.id !== track.id)
  setSongs(newSongs)
  
  const response = await fetch("/api/spotify/deleteItem", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      playlist,
      track: `spotify:track:${track.id}`
    })
  })

  if (!response.ok) {
    setSongs(songs)
    throw new Error("Failed to delete song")
  }
}