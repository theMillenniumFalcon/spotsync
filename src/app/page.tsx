import { redirect } from "next/navigation"

import Landing from "@/components/landing"

export default function Home() {
  let user = false

  if (user) {
    redirect("/dashboard")
  }

  return <Landing />
}
