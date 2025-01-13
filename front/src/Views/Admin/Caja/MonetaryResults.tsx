import React from 'react'
import GeneralSummary from '@/components/Admin/Caja/GeneralSummary'
import UserEarnings from '@/components/Admin/Caja/UserEarnings'

export default function MonetaryResults() {
  return (
    <div className="space-y-8">
      <GeneralSummary />
      <UserEarnings />
    </div>
  )
}

