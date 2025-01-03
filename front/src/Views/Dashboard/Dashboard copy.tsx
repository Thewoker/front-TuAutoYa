'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import axios from 'axios'
import { DashboardSidebar } from '@/components/dashboard/Sidebar'
import ClientDashboard from '@/components/dashboard/Cliente/ClientDashboard'
import OwnerDashboard from '@/components/dashboard/Proveedor/OwnerDashboard'
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Dashboard() {
    const [role, setRole] = useState<string | null>(null)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const getRole = async () => {
            try {
                const { data } = await axios.get("/api/getUserData")
                const user = JSON.parse(data)
    
                if (user) {
                    console.log(user.role)
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

    const renderContent = () => {
        switch (pathname) {
            case '/dashboard/provider':
                return role !== 'customer' ? <OwnerDashboard /> : <div>No tienes permiso para ver esta página</div>
            case '/dashboard/client':
                return <ClientDashboard />
            case '/dashboard/personal-data':
                return <div>Componente de Datos Personales (por implementar)</div>
            case '/dashboard/become-provider':
                return role === 'customer' ? <div>Componente de Sé un Proveedor (por implementar)</div> : <div>Ya eres un proveedor</div>
            default:
                return <div>Selecciona una opción del menú</div>
        }
    }

    if (!role) {
        return <div>Cargando...</div>
    }

    return (
        <SidebarProvider>
            <div className="flex h-screen">
                <div className="w-64 flex-shrink-0">
                    <DashboardSidebar role={role} />
                </div>
                <div className="flex-grow overflow-auto">
                    <div className="container mx-auto p-4">
                        <h1 className="text-3xl font-bold mb-6">
                            {pathname === '/dashboard/provider' ? 'Dashboard del Proveedor' : 
                             pathname === '/dashboard/client' ? 'Dashboard del Cliente' : 
                             pathname === '/dashboard/personal-data' ? 'Datos Personales' : 
                             pathname === '/dashboard/become-provider' ? 'Sé un Proveedor' : 
                             'Dashboard'}
                        </h1>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}

