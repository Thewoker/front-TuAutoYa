"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/dashboard/Navbar'
import Sidebar from '@/components/dashboard/Sidebar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from "next/navigation";

function ConditionalLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()
    const pathname = usePathname()
    const isInDashboard = pathname.startsWith('/dashboard')
    const pathnameFiltered = pathname.split('/dashboard').join('')
    const [role, setRole] = useState('')
    console.log("pathnameFiltered: ", pathnameFiltered, typeof(pathnameFiltered));


    useEffect(() => {
        const getRole = async () => {
            try {
                const { data } = await axios.get("/api/getUserData")
                const user = JSON.parse(data)

                if (user) {
                    setRole(user.role)
                }
            } catch (error) {
                console.error("Se ha producido un error: ", error)
                router.push('/Login')
            }
        }

        getRole()
    }, [router]);

    if (isInDashboard) return (
        <div className="flex bg-gray-100">
            <Sidebar activeTab={pathnameFiltered} role={role} />
            <main className="min-h-screen w-full bg-white">
                <Navbar />
                {children}
            </main>
        </div>
    )

    return children
    
}

export default ConditionalLayout