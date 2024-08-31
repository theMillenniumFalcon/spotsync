import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.headers.get("Authorization")?.split(" ")[1]
    const searchParams = req.nextUrl.searchParams
    const q = searchParams.get("q")

    if (!accessToken || !q) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=10`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Failed to search tracks on Spotify")
    }

    const songs = await response.json()
    return NextResponse.json({ songs })
  } catch (error) {
    console.error("Error searching songs:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}