import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const accessToken = searchParams.get("accessToken")
    const id = searchParams.get("id")

    if (!accessToken || !id) {
      return NextResponse.json({ error: "Missing accessToken or id" }, { status: 400 })
    }

    const response = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const songs = await response.json()

    if (!response.ok) {
      throw new Error(songs.error?.message || "Failed to fetch playlist tracks")
    }

    return NextResponse.json({ songs })
  } catch (error) {
    console.error("Error fetching playlist tracks:", error)
    return NextResponse.json({ error: "Failed to fetch playlist tracks" }, { status: 400 })
  }
}