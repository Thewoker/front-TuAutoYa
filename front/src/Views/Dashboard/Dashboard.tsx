'use client'

import { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import ClientDashboard from '@/components/dashboard/Cliente/ClientDashboard'
import OwnerDashboard from '@/components/dashboard/Proveedor/OwnerDashboard'

export default function Dashboard() {
    const [isOwner, setIsOwner] = useState(false)

    return (
        <div className="container mx-auto p-4">
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

            {isOwner ? <OwnerDashboard /> : <ClientDashboard />}
        </div>
    )
}

