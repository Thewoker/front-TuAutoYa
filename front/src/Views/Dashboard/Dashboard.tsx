'use client'

import { useState, useEffect } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import ClientDashboard from '@/components/dashboard/Cliente/ClientDashboard'
import OwnerDashboard from '@/components/dashboard/Proveedor/OwnerDashboard'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function Dashboard() {
    const [isOwner, setIsOwner] = useState(false)
    const [role, setRole] = useState<Boolean>(false)
    const router = useRouter()

    useEffect(() => {
        getRole()
    }, []);

    const getRole = async () => {
        const { data: user } = await axios.get("/api/getUserData")
        console.log(user)

        try {
            if (user) {
                setRole(user.role == "customer" ? false : true)
            } else router.push('/Login')

        } catch (error) {
            console.error("Se ha producido un error: ", error)
        }
    }

    return (
        <div className="container mx-auto p-4">
            {role &&
                (
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">
                        {isOwner ? 'Dashboard del Propietario' : 'Dashboard del Cliente'}
                    </h1>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="dashboard-mode"
                            checked={isOwner}
                            onCheckedChange={setIsOwner}
                        />

                        <Label htmlFor="dashboard-mode">
                            {isOwner ? 'Modo Propietario' : 'Modo Cliente'}
                        </Label>
                    </div>
                </div>
                )}

            {isOwner ? <OwnerDashboard /> : <ClientDashboard />}
        </div>
    )
}

