import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSession } from "next-auth/react"
 
export async function middleware(request: NextRequest) {
    const requestForNextAuth = {
        headers: {
          cookie: request.headers.get('cookie'),
        },
    }

    const session = await getSession({ request: requestForNextAuth })

    if (session) {
        console.log('Session is: ', session)

        return NextResponse.next()
    } else {
        console.log("There is no session")
    }
}

export const config = {
  matcher: '/',
}