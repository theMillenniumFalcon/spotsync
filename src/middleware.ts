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

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

//   if (token) {
//     console.log('Session token found:', token)
//     return NextResponse.next()
//   } else {
//     console.log('No session token found')
//     // Redirect to login page or show an error
//     return NextResponse.redirect(new URL('/login', request.url))
//   }
// }

export const config = {
  matcher: '/',
}