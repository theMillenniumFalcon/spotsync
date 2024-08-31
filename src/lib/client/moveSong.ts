export const moveSong = async ({
  playlist,
  accessToken,
  start,
  insert,
}: {
  playlist: string
  accessToken: string
  start: number
  insert: number
}) => {
  const response = await fetch("/api/spotify/moveItem", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      playlist,
      start,
      insert: insert > start ? insert + 1 : insert
    })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to move song")
  }

  return response.json()
}