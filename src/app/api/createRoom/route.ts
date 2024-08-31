import { NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const playlist = searchParams.get("playlist")
  const user = searchParams.get("user")

  if (!playlist) {
    return NextResponse.json({ message: "Playlist must be provided" }, { status: 400 })
  }
  if (!user) {
    return NextResponse.json({ message: "User must be provided" }, { status: 400 })
  }

  try {
    const roomId = nanoid()

    await prisma.room.create({
      data: {
        id: roomId,
        playlist,
        owner: user,
      },
    })

    return NextResponse.json({ roomId })
  } catch (error) {
    console.error("Error creating room:", error)
    return NextResponse.json({ error: "Failed to create room" }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json({ message: "Only POST requests are allowed" }, { status: 405 })
}
