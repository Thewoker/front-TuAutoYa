'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { UserCard } from '@/components/Admin/Users/UserCard'
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { User } from '@/Interfaces/IUsersAdmin'

export function PermissionsUsersView() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { toast } = useToast()

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
            if (!response.ok) throw new Error('Failed to fetch users')
            const data = await response.json()
            setUsers(data)
        } catch (err) {
            setError('Error fetching users')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleUserAction = async (userId: string, action: 'block' | 'enable') => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/${action}`, {
                method: 'PUT',
            })
            if (!response.ok) throw new Error(`Failed to ${action} user`)

            setUsers(users.map(user =>
                user.id === userId
                    ? { ...user, isEnabled: action === 'enable' }
                    : user
            ))

            toast({
                title: "Success",
                description: `User ${action === 'block' ? 'blocked' : 'enabled'} successfully`,
                action: (
                    <ToastAction altText="Dismiss">Dismiss</ToastAction>
                ),
            })
        } catch (err) {
            console.error(err)
            toast({
                title: "Error",
                description: `Failed to ${action} user`,
                variant: "destructive",
                action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                ),
            })
        }
    }

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            const userToUpdate = users.find(user => user.id === userId)
            if (!userToUpdate) throw new Error('User not found')

            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                ...userToUpdate,
                role: newRole
            })

            setUsers(users.map(user =>
                user.id === userId
                    ? { ...user, role: newRole }
                    : user
            ))

            toast({
                title: "Success",
                description: `User role updated to ${newRole} successfully`,
                action: (
                    <ToastAction altText="Dismiss">Dismiss</ToastAction>
                ),
            })
        } catch (err) {
            console.error(err)
            toast({
                title: "Error",
                description: "Failed to update user role",
                variant: "destructive",
                action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                ),
            })
        }
    }

    if (loading) return <div>Loading users...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    onBlock={(userId) => handleUserAction(userId, 'block')}
                    onEnable={(userId) => handleUserAction(userId, 'enable')}
                    onRoleChange={handleRoleChange}
                />
            ))}
        </div>
    )
}

