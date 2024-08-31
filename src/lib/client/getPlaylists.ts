export const getPlaylists = async (accessToken: string) => {
  const res = await fetch(`/api/spotify/getPlaylists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch playlists')
  }
  return res.json()
}