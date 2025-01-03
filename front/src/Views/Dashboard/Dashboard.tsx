'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ClientDashboard from '@/components/dashboard/Cliente/ClientDashboard'
import OwnerDashboard from '@/components/dashboard/Proveedor/OwnerDashboard'

export default function Dashboard() {
    const [role, setRole] = useState<string | null>(null)
    const [isOwner, setIsOwner] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const getRole = async () => {
            try {
                const { data } = await axios.get("/api/getUserData")
                const user = JSON.parse(data)

                if (user) {
                    setRole(user.role)
                } else {
                    router.push('/Login')
                }
            } catch (error) {
                console.error("Se ha producido un error: ", error)
                router.push('/Login')
            }
        }

        getRole()
    }, [router]);



    if (!role) {
        return <div>Cargando...</div>
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex">
                <div className="flex-1 p-6">
                    {isOwner ? <OwnerDashboard /> : <ClientDashboard />}
                </div>
            </div>
        </div>
    )
}

