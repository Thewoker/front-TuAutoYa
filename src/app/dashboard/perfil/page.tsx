import React from 'react'
import { UserProfile } from '@/Views/Dashboard/Perfil/PerfilView'

function page() {
  return <div className='p-6'>
    <h2 className="text-2xl font-semibold mb-4 text-emerald-900">
    Perfil de Usuario
    </h2>
    <UserProfile />
  </div>
}

export default page