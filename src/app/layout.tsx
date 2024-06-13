import type { Metadata } from "next"
import { Session } from "next-auth"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { SessionProvider } from "next-auth/react"

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/layout/themeProvider"
import "./globals.css"

export const metadata: Metadata = {
  title: "spotsync",
  description: "Real-time Spotify playlist collaboration",
}

export default function RootLayout({
  children,
  session
}: Readonly<{
  children: React.ReactNode
  session: Session
}>) {
  return (
    <SessionProvider session={session}>
      <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            {children}
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
