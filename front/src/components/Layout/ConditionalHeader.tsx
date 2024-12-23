"use client"
import { usePathname } from 'next/navigation'
import { AdminNavbar } from "@/components/Admin/AdminNavbar"
import NavBar from "@/components/Navbar/Navbar"

export function ConditionalHeader() {
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith('/admin')
  console.log("Cond", pathname, isAdminPage)

  if (isAdminPage) {
    return <AdminNavbar />
  }

  return <NavBar />
}

