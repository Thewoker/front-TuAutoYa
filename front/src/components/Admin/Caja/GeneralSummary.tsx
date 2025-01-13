'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

interface WeeklySummary {
  week: string;
  total: number;
  orderCount: number;
}

interface GeneralSummary {
  totalAccumulated: number;
  weeklySummary: WeeklySummary[];
}

export default function GeneralSummary() {
  const [summary, setSummary] = useState<GeneralSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get<GeneralSummary>(`${process.env.NEXT_PUBLIC_API_URL}/orders/summary/general`)
        setSummary(response.data)
      } catch (error) {
        console.error('Error fetching general summary:', error)
        toast({
          title: "Error",
          description: "Failed to fetch general summary. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [toast])

  if (loading) {
    return <div>Loading general summary...</div>
  }

  if (!summary) {
    return <div>No summary data available.</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingresos Generales</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Total Acumulado</TableHead>
              <TableHead>${summary.totalAccumulated.toFixed(2)}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summary.weeklySummary.map((week, index) => (
              <TableRow key={index}>
                <TableCell>Por semana{new Date(week.week).toLocaleDateString()}</TableCell>
                <TableCell>${week.total.toFixed(2)} ({week.orderCount} ordenes)</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

