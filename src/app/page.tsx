import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getServerSession } from "next-auth"

import Landing from "@/components/landing"
import { authOptions } from "./api/auth/[...nextauth]/options"

export default function Home() {
  return <Landing />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}