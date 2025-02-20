"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import CustomButton from "@/components/ui/customButton"

import Logo from "../../../public/logo/logo.svg"
import LoginModal from "./login"

export const Landing = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  return (
    <>
      <LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />
      <div className="w-screen h-screen flex justify-center overflow-hidden overscroll-none">
        <div className="w-full max-w-screen-lg px-8 flex flex-col items-center relative">
          <div className="w-full flex items-center justify-between py-8">
            <div className="flex items-center font-medium">
              <Image
                src={Logo}
                alt="Logo"
                width={36}
                height={36}
                className="mr-2"
              />
            </div>
          </div>
          <h1 className="text-2xl font-medium text-center mt-16">
            A playlist collaboration application
          </h1>
          <div className="text-muted-foreground mt-4 text-center">
            SpotSync is an open-source real-time Spotify playlist collaboration application.
          </div>
          <div className="mt-8 flex space-x-4">
            <CustomButton onClick={() => setLoginModalOpen(true)}>Log In With Spotify</CustomButton>
            <a
              href="https://github.com/themillenniumfalcon/spotsync"
              target="_blank"
              className="group h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              GitHub Repository
              <ChevronRight className="h-4 w-4 ml-1 transition-all group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-6">
            <video
              width="320"
              height="240"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
            <source src="/gif/listening_song.mp4" type="video/mp4" />
            Your browser does not support the video tag.
            </video>
          </div>
          <div className="absolute bottom-4 right-4">
            <p className="select-none cursor-default text-muted-foreground grayscale">
              Built with ❤️ by{" "}
              <a 
                  href="https://nishank.vercel.app" 
                  target="_blank"
                  className="text-white underline decoration-neutral-600 underline-offset-4 focus:(decoration-neutral-500 outline-offset-6) hover:decoration-neutral-500"
              >
                Nishank Priydarshi
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}