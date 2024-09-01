"use client"

import { ChevronRight } from "lucide-react"
import { signIn } from "next-auth/react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import CustomButton from "../ui/customButton"

export default function LoginModal({ open, setOpen }: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>SpotSync</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground">
            Spotify doesn&apos;t allow public OAuth access, so the developer needs 
            to manually give users access.
        </div>
        <div className="flex flex-row items-center justify-between">
            <CustomButton 
              className="w-full mr-2"
              onClick={() => window.open("https://x.com/nishankstwt")}
            >
                Ask for access
            </CustomButton>
            <Button 
                onClick={() => signIn("spotify")} 
                variant="subtle" 
                className="w-full ml-2 h-9"
            >
                Log In
                <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}