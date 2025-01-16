import React from 'react'
import { PermissionsUsersView } from '@/Views/Admin/Users/PermissionsUsersView'

function page() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Administración de Usuarios</h1>
            <PermissionsUsersView />
        </div>
    )
}

export default page