import React from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "../api/auth/[...nextauth]/options"
import Dashboard from "./dashboard"

interface DashboardProps {}

const DashboardPage: React.FC<DashboardProps> = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  const user = await prisma!.user.findUnique({
    where: {
      email: session.user?.email ?? "",
    },
    include: {
      accounts: true,
    },
  })

  return <Dashboard user={user} />
}

export default DashboardPage