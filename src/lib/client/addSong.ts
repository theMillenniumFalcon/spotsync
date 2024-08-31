import { songType } from "@/types/song"

export const addSong = async ({
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
  setSongs([...songs, track])

  try {
    const response = await fetch("/api/spotify/addItem", {
      method: "POST",
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
      // Revert the optimistic update if the API call fails
      setSongs(songs)
      throw new Error("Failed to add song to playlist")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error adding song:", error)
    throw error
  }
}