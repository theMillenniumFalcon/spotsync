"use client"

import React, { useEffect } from "react"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useSession } from "next-auth/react"

import { PlaylistSelect } from "@/components/dashboard"
import { Sidebar } from "@/components/sidebar"
import { UDataType, useStore } from "@/lib/state"

interface DashboardProps {
  user: InferGetServerSidePropsType<GetServerSideProps>
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const { data: session } = useSession()
  const data = session?.user

  const setUserData = useStore((state) => state.setUserData)
  const setAccessToken = useStore((state) => state.setAccessToken)

  useEffect(() => {
    setAccessToken(user.accounts?.[0].access_token)

    const userData: UDataType = {
      id: user.accounts?.[0].providerAccountId,
      userExt: user.accounts?.[0].providerAccountId,
      email: data?.email,
      name: data?.name,
      image: data?.image,
    }
    setUserData(userData)
  }, [data?.email, data?.image, data?.name, setAccessToken, setUserData, user.accounts])

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="dashboard-scroll flex h-full overflow-x-auto">
        <Sidebar editing={false} />
        <PlaylistSelect />
      </div>
    </div>
  )
}

export default Dashboard