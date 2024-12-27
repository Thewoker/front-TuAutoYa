import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const user = cookieStore.get('user') 
  const path = request.nextUrl.pathname

  if (path.startsWith('/dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/Login', request.url))
    }
  }

  if (path.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/Login', request.url))
    }

    try {
      const userData = JSON.parse(user.value)
      if (userData.rol !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } catch (error) {
      console.error('Error parsing user data:', error)
      return NextResponse.redirect(new URL('/Login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
