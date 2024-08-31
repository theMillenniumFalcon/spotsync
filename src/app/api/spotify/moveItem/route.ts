import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest) {
  try {
    const accessToken = req.headers.get("Authorization")?.split(" ")[1]
    const { playlist, start, insert } = await req.json()

    if (!accessToken || !playlist || typeof start !== "number" || typeof insert !== "number") {
      return NextResponse.json({ error: "Missing or invalid required parameters" }, { status: 400 })
    }

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist}/tracks`,
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          range_start: start,
          insert_before: insert,
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Failed to move track in Spotify playlist")
    }

    const data = await response.json()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error moving track:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}