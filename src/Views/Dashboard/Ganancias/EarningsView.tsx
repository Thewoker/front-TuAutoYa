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
  const [month, setMonth] = useState(fechaActual.getMonth() + 1)
  const { toast } = useToast()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get('/api/getUserData')
        console.log("User data response:", data)
        if (data && data.message !== "Not logged in") {
          const user = typeof data === 'string' ? JSON.parse(data) : data
          console.log("Parsed user data:", user)
          setUser(user)
          await fetchEarnings(user.id, year, month)
        } else {
          console.error("User not logged in or invalid data received")
          toast({
            title: "Error",
            description: "User not logged in or invalid data received.",
            variant: "destructive",
          })
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
  }, [toast, year, month])

  const fetchEarnings = async (userId: string, selectedYear: number, selectedMonth: number) => {
    setLoading(true)
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/user/${userId}/earnings`
      console.log("Fetching earnings with params:", { userId, year: selectedYear, month: selectedMonth })
      console.log("Full URL:", url)

      const response = await axios.get<UserEarnings>(url, {
        params: {
          year: selectedYear,
          month: selectedMonth
        }
      })
      console.log("Earnings response:", response.data)
      setEarnings(response.data)
    } catch (error) {
      console.error('Error fetching user earnings:', error)
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', error.response?.data)
      }
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
    return <div>No data available. Please ensure youre logged in and try again.</div>
  }

  return (
    <EarningsCard
      user={user}
      earnings={earnings}
      year={year}
      month={month}
      onYearChange={(newYear) => {
        setYear(newYear)
        if (user) fetchEarnings(user.id, newYear, month)
      }}
      onMonthChange={(newMonth) => {
        setMonth(newMonth)
        if (user) fetchEarnings(user.id, year, newMonth)
      }}
      onFilterChange={handleFilterChange}
    />
  )
}

