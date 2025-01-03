'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ClientDashboard from '@/components/dashboard/Cliente/ClientDashboard'
import OwnerDashboard from '@/components/dashboard/Proveedor/OwnerDashboard'
import { DashboardSidebar } from '@/components/dashboard/Sidebar'

export default function Dashboard() {
    const [role, setRole] = useState<string | null>(null)
    const [isOwner, setIsOwner] = useState(false)
    const [activeView, setActiveView] = useState('pasadas')
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

    useEffect(() => {
        console.log("Vista escojida: ", activeView)
    }, [activeView])


    const renderContent = () => {
        switch (activeView) {
            case "pending":
                return <ClientDashboard />
                break;
            case "before":
                return <ClientDashboard />
                break;
            case "data":
                return <>Falta desarrollar el componente</>
                break;
            case "supplier":
                return <OwnerDashboard />
                break;
            case "join_us":
                return <>Falta desarrollar el componente</>
                break;
            default:
                return <h1>Area no disponible</h1>
                break;
        }
    }

    if (!role) {
        return <div>Cargando...</div>
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex">
                {/* Sidebar */}
                <div className="w-64 border-r bg-gray-50">
                    <DashboardSidebar
                        activeView={activeView}
                        onViewChange={setActiveView}
                        role={role}
                    />
                </div>

                {/* Área principal de contenido */}
                <div className="flex-1 p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

