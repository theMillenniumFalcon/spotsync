import type { Metadata } from "next"
// import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

import Landing from "@/components/landing"

export const metadata: Metadata = {
  title: "spotsync",
  description: "Real-time Spotify playlist collaboration",
}

export default function Home() {
  // const { data: session} = useSession()

  // if (session) {
  //   redirect("/dashboard")
  // }

  return <Landing />
}
