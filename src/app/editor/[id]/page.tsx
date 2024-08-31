import React from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "../../api/auth/[...nextauth]/route"
import Editor from "./editor"

interface EditorPageProps {
  params: {
    id: string
  }
}

const EditorPage: React.FC<EditorPageProps> = async ({ params }) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email ?? "",
    },
    include: {
      accounts: true,
    },
  })

  const room = await prisma.room.findUnique({
    where: {
      id: params.id,
    },
  })

  const playlist = room ? room.playlist : ""
  const owner = room ? room.owner : ""
  const expiry = room ? room.createdAt.getTime() + 3600000 : undefined

  return <Editor user={user} playlist={playlist} expiry={expiry} owner={owner} />
}

export default EditorPage