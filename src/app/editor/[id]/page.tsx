"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useSession } from "next-auth/react"

import { UDataType, useStore } from "@/lib/state"
import { COLORS } from "@/lib/colors"
import { Sidebar } from "@/components/sidebar"
import { Editor } from "@/components/editor"
import { Cursor } from "@/components/editor/cursor"
import { SongSearchCommand } from "@/components/editor/songSearchCommand"
import { getPlaylists } from "@/lib/client/getPlaylists"
import { NoAuth, NoRoom } from "@/components/editor/redirects"

const EditorScreen = ({
    user,
    playlist,
    expiry,
    owner,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
    const { data: session } = useSession()
    const data = session?.user

    const accessToken = useStore((state) => state.accessToken)
    const setPlaylists = useStore((state) => state.setPlaylists)
    const setAccessToken = useStore((state) => state.setAccessToken)
    const setUserData = useStore((state) => state.setUserData)
    const setSelected = useStore((state) => state.setSelected)

    useEffect(() => {
        const userData: UDataType = {
            id: user.accounts?.[0].providerAccountId,
            userExt: user.accounts?.[0].providerAccountId,
            email: data?.email,
            name: data?.name,
            image: data?.image,
        }
        setUserData(userData)

        if (owner === user.accounts?.[0].providerAccountId) {
            setAccessToken(user.accounts?.[0].access_token)
        }
        setSelected(playlist)
    }, [data?.email, data?.name, data?.image, owner, playlist, setAccessToken, setSelected, setUserData, user.accounts])

    const {
        liveblocks: { enterRoom, leaveRoom },
    } = useStore()
    const others = useStore((state) => state.liveblocks.others)

    const cursor = useStore((state) => state.cursor)
    const message = useStore((state) => state.message)
    const messageMode = useStore((state) => state.messageMode)

    const setCursor = useStore((state) => state.setCursor)
    const setMessage = useStore((state) => state.setMessage)
    const setMessageMode = useStore((state) => state.setMessageMode)

    const expanded = useStore((state) => state.expanded)

    const [editorScroll, setEditorScroll] = useState(0)
    const [songDialogOpen, setSongDialogOpen] = useState(false)

    const router = useRouter()
    const roomId = router.asPath.split("/")[2]

    const expired = expiry < Date.now()

    useEffect(() => {
        if (playlist && !expired) {
            enterRoom(roomId)
            return () => {
                leaveRoom()
            }
        }
    }, [enterRoom, leaveRoom, expired, playlist, roomId])

    useEffect(() => {
        if (accessToken) {
        getPlaylists({ accessToken }).then((res) => {
            setPlaylists(res.playlists)
        })
        }
    }, [accessToken, setPlaylists])

  return (
    <div
      className="h-screen w-screen overflow-hidden"
      onPointerMove={(e) =>
        setCursor({
          x: e.clientX + (expanded ? 0 : 152),
          y: e.clientY + editorScroll,
        })
      }>

      {playlist && !expired ? (
        <>
          {session ? (
            <>
              {others.map(({ connectionId, presence }) => {
                if (presence.cursor === null || !presence.cursor) {
                  return null
                }
                return (
                  <>
                    <Cursor
                      key={`cursor-${connectionId}`}
                      color={COLORS[connectionId % COLORS.length]}
                      // @ts-ignore
                      x={presence?.cursor?.x - (expanded ? 0 : 152)}
                      // @ts-ignore
                      y={presence?.cursor?.y - editorScroll}
                      // @ts-ignore
                      message={presence.message}
                      // @ts-ignore
                      messageMode={presence.messageMode}
                      self={false}
                    />
                  </>
                )
              })}

              <Cursor
                key={`self`}
                color="#3b82f6"
                // @ts-ignore
                x={cursor?.x}
                // @ts-ignore
                y={cursor?.y - editorScroll}
                message={message}
                // message={"message"}
                self
                messageMode={messageMode}
                setMessageMode={setMessageMode}
                setMessage={setMessage}
              />
              <SongSearchCommand
                open={songDialogOpen}
                setOpen={setSongDialogOpen}
              />
              <div className="dashboard-scroll flex h-full overflow-x-auto">
                <Sidebar editing selected={playlist} />
                {/* <div>{JSON.stringify(playlist)}</div> */}
                <Editor
                  setEditorScroll={setEditorScroll}
                  setOpen={setSongDialogOpen}
                />
              </div>
            </>
          ) : (
            <NoAuth />
          )}
        </>
      ) : (
        <NoRoom expired={expired} />
      )}
    </div>
  )
}

export default EditorScreen