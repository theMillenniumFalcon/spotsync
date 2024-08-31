import { Dispatch, SetStateAction } from "react"

export const searchSongs = async (
  q: string,
  accessToken: string,
  setSongs: Dispatch<SetStateAction<any>>
) => {
  try {
    const response = await fetch(`/api/spotify/searchSongs?q=${encodeURIComponent(q)}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to search songs')
    }

    const data = await response.json()
    setSongs(data.songs?.tracks?.items || [])
  } catch (error) {
    console.error('Error searching songs:', error)
    setSongs([])
  }
}