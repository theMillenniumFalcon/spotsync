"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

import { Landing } from "@/components/landing"

export default function Home() {
  const { data: session} = useSession()

  if (session) {
    redirect("/dashboard")
  }

  return <Landing />
}
