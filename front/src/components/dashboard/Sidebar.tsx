'use client'

import { Button } from "@/components/ui/button"
import { ClockIcon as ClockArrowDown, ClockIcon as ClockCountdown, CircleUserRound, Car, BadgeDollarSign } from 'lucide-react'

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  role: string | null;
}

export function DashboardSidebar({ activeView, onViewChange, role }: SidebarProps) {
  const menuItems = [
    { id: 'pending', label: 'Pendientes', icon: ClockCountdown },
    { id: 'before', label: 'Pasadas', icon: ClockArrowDown },
    { id: 'data', label: 'Informacion Personal', icon: CircleUserRound },
    { id: 'supplier', label: 'Proveedor', icon: Car, hideForCustomer: true },
    { id: 'join_us', label: 'Unete como Proveedor', icon: BadgeDollarSign, onlyForCustomer: true },
  ]

  const filteredMenuItems = menuItems.filter(item => {
    if (role === 'customer') {
      return !item.hideForCustomer;
    } else {
      return !item.onlyForCustomer;
    }
  });

  return (
    <div className="p-4 space-y-2">
      {filteredMenuItems.map((item) => {
        const Icon = item.icon
        return (
          <Button
            key={item.id}
            variant={activeView === item.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onViewChange(item.id)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        )
      })}
    </div>
  )
}

