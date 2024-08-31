import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest) {
  try {
    const accessToken = req.headers.get("Authorization")?.split(" ")[1]
    const { playlist, track } = await req.json()

    if (!accessToken || !playlist || !track) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist}/tracks`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tracks: [{ uri: track }]
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Failed to delete track from Spotify playlist")
    }

    return NextResponse.json({ message: "Track deleted successfully" })
  } catch (error) {
    console.error("Error deleting track:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}