import { UserEarningsView } from '@/Views/Dashboard/Ganancias/EarningsView'
import React from 'react'

function page() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4 text-emerald-900">Tus Ganancias</h1>
            <UserEarningsView />
        </div>
    )
}

export default page