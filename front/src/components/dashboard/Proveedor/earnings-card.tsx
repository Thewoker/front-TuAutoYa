import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserEarnings } from '@/Interfaces/earnings'
import { getDate } from 'date-fns'

interface EarningsCardProps {
  user: UserEarnings['user'];
  earnings: UserEarnings;
  year: number;
  month: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onFilterChange: () => void;
}

export function EarningsCard({
  user,
  earnings,
  year,
  month,
  onYearChange,
  onMonthChange,
  onFilterChange
}: EarningsCardProps) {
  const fechaActual = new Date()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Información del Usuario</h3>
        <p>Nombre: {user.name || 'N/A'}</p>
        <p>Email: {user.email}</p>
      </div>

      <div className="flex space-x-2">
        <Input
          placeholder="Year (YYYY)"
          value={year}
          max={fechaActual.getFullYear()}
          onChange={(e) => onYearChange(Number(e.target.value))}
        />
        <Input
          placeholder="Month (1-12)"
          value={month}
          min={1}
          max={12}
          onChange={(e) => onMonthChange(Number(e.target.value))}
        />
        <Button className='bg-[#022c22]' onClick={onFilterChange}>Filtrar</Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Resumen de ganancias</h3>
        <p>Year: {earnings.year}</p>
        <p>Month: {earnings.month}</p>
        <p className="text-xl font-bold">Ganancia total: ${earnings.totalEarnings.toFixed(2)}</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Semanal</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Recuento de pedidos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {earnings.weeklySummary.map((week, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(week.week).toLocaleDateString()}</TableCell>
              <TableCell>${week.total.toFixed(2)}</TableCell>
              <TableCell>{week.orderCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

