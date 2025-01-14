'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: string;
  name: string | null;
  email: string;
  identity: number | null;
  phone: string | null;
  city: string | null;
  role: string;
  isEnabled: boolean;
}

interface WeeklySummary {
  week: string;
  total: number;
  orderCount: number;
}

interface UserEarnings {
  user: User;
  year: number;
  month: number;
  totalEarnings: number;
  weeklySummary: WeeklySummary[];
}

export default function UserEarnings() {
  const [earnings, setEarnings] = useState<UserEarnings | null>(null)
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/users`)
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
        toast({
          title: "Error",
          description: "Failed to fetch users. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchUsers()
  }, [toast])

  const fetchEarnings = async () => {
    if (!selectedUserId) {
      toast({
        title: "Error",
        description: "Please select a user.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/orders/user/${selectedUserId}/earnings`
      if (year && month) {
        url += `?year=${year}&month=${month}`
      }
      const response = await axios.get<UserEarnings>(url)
      setEarnings(response.data)
    } catch (error) {
      console.error('Error fetching user earnings:', error)
      toast({
        title: "Error",
        description: "Failed to fetch user earnings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading user earnings...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ganacias del Usuario</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Select onValueChange={setSelectedUserId} value={selectedUserId}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name || user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Año (Requerido)"
              value={year}
              required
              onChange={(e) => setYear(e.target.value)}
            />
            <Input
              placeholder="Mes (Requeido)"
              value={month}
              required
              onChange={(e) => setMonth(e.target.value)}
            />
            <Button onClick={fetchEarnings}>Solicitar Ganancias del Usuario</Button>
          </div>
          
          {earnings && (
            <>
              <div>
                <h3 className="text-lg font-semibold">User Information</h3>
                <p>ID: {earnings.user.id}</p>
                <p>Name: {earnings.user.name || 'N/A'}</p>
                <p>Email: {earnings.user.email}</p>
                <p>Role: {earnings.user.role}</p>
                <p>Enabled: {earnings.user.isEnabled ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Earnings Summary</h3>
                <p>Year: {earnings.year}</p>
                <p>Month: {earnings.month}</p>
                <p>Total Earnings: ${earnings.totalEarnings.toFixed(2)}</p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Week</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Order Count</TableHead>
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
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

