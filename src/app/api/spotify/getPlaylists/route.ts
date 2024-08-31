import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.headers.get("Authorization")?.split(" ")[1]

    if (!accessToken) {
      return NextResponse.json({ error: "No access token provided" }, { status: 401 })
    }

    const response = await fetch(
      "https://api.spotify.com/v1/me/playlists?limit=50",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )

    const playlists = await response.json()

    if (!response.ok) {
      throw new Error(playlists.error?.message || "Failed to fetch playlists from Spotify")
    }

    return NextResponse.json({ playlists })
  } catch (error) {
    console.error("Error fetching playlists:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}