import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const accessToken = req.headers.get("Authorization")?.split(" ")[1]
    const { playlist, track } = await req.json()

    if (!accessToken || !playlist || !track) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist}/tracks?uris=${encodeURIComponent(track)}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Failed to add track to Spotify playlist")
    }

    const data = await response.json()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error adding track:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}