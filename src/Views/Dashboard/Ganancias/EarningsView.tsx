'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useToast } from "@/hooks/use-toast"
import { EarningsCard } from '@/components/dashboard/Proveedor/earnings-card'
import { User, UserEarnings } from '@/Interfaces/earnings'

export function UserEarningsView() {
  const [user, setUser] = useState<User | null>(null)
  const [earnings, setEarnings] = useState<UserEarnings | null>(null)
  const [loading, setLoading] = useState(true)
  const fechaActual = new Date();
  const [year, setYear] = useState(fechaActual.getFullYear())
  const [month, setMonth] = useState(fechaActual.getMonth())
  const { toast } = useToast()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {data} = await axios.get('/api/getUserData')
        if (data?.message!= "Not logged in") {
          const user = JSON.parse(data)
          setUser(user)
          await fetchEarnings(user.id, fechaActual.getFullYear(), fechaActual.getMonth())
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        toast({
          title: "Error",
          description: "Failed to fetch user data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [toast])

  const fetchEarnings = async (userId: string, selectedYear: number, selectedMonth: number) => {
    setLoading(true)
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/orders/user/${userId}/earnings`
      url += `?year=${selectedYear}&month=${selectedMonth == 0 ? 1 : selectedMonth}`
      console.log("url: ",url)
      const response = await axios.get<UserEarnings>(url)
      setEarnings(response.data)
    } catch (error) {
      console.error('Error fetching user earnings:', error)
      toast({
        title: "Error",
        description: "Failed to fetch earnings data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = () => {
    if (user) {
      fetchEarnings(user.id, year, month)
    }
  }

  if (loading) {
    return <div>Loading earnings data...</div>
  }

  if (!user || !earnings) {
    return <div>No data available.</div>
  }

  return (
    <EarningsCard
      user={user}
      earnings={earnings}
      year={year}
      month={month}
      onYearChange={setYear}
      onMonthChange={setMonth}
      onFilterChange={handleFilterChange}
    />
  )
}

