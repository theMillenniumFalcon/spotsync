"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Check, Copy, Users } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { baseURL } from "@/lib/baseURL"

export const LinkPopover = () => {
    const [copied, setCopied] = useState(false)
    const pathname = usePathname()
    const roomId = pathname.split("/")[2]

    useEffect(() => {
        if (copied) {
        setTimeout(() => {
            setCopied(false)
        }, 1000)
        }
    }, [copied])

    return (
        <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" className="h-10 w-10 rounded-full p-0">
            <Users className="h-4 w-4" />
            <span className="sr-only">Open popover</span>
            </Button>
        </PopoverTrigger>
        <PopoverContent
            align="end"
            className="w-80 p-2">
            <div className="relative h-10 w-full overflow-hidden rounded-md border border-zinc-300 font-normal">
            <div className="absolute right-0 top-0 z-10 h-full"></div>
            <Button
                onClick={() => {
                    navigator.clipboard.writeText(
                        `${baseURL}/editor/${roomId}`
                    )
                    setCopied(true)
                }}
                className="circular absolute right-[3px] top-1/2 z-20 h-auto -translate-y-1/2 py-1.5 px-2 text-xs shadow-[0_0px_20px_10px] shadow-white">
                {copied ? (
                    <Check className="mr-1 h-3 w-3" />
                ) : (
                    <Copy className="mr-1 h-3 w-3" />
                )}
                    Copy
            </Button>
            <div className="link-scroll circular flex h-10 min-w-full overflow-x-auto overflow-y-hidden bg-transparent py-2 px-3 pr-[5.5rem] text-sm font-normal">
                <div className="z-0 whitespace-nowrap">
                    {baseURL}/editor/{roomId}
                </div>
            </div>
            </div>
        </PopoverContent>
        </Popover>
    )
}
