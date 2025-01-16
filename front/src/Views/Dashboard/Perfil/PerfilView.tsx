'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UserData {
    id?: string
    name: string | null
    email: string
    password: string | null
    identity: number | null
    phone: string | null
    city: string | null
    role?: string
    isEnabled?: boolean
}

export function UserProfile() {
    const [userData, setUserData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        fetchUserData()
    }, [])

    const fetchUserData = async () => {
        try {
            const response = await axios.get<UserData>('/api/getUserData')
            setUserData(response.data)
        } catch (error) {
            console.error('Error fetching user data:', error)
            toast({
                title: "Error",
                description: "Error al obtener los datos del usuario. Por favor, inténtalo de nuevo.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData(prev => {
            if (!prev) return null
            if (name === 'identity') {
                return { ...prev, [name]: value === '' ? null : parseInt(value, 10) }
            }
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!userData) return

        setUpdating(true)
        try {
            const { name, email, password, identity, phone, city } = userData
            console.log("update", name, email, password, identity, phone, city)
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users`, { name, email, password, identity, phone, city })
            toast({
                title: "Éxito",
                description: "Perfil de usuario actualizado con éxito.",
            })
        } catch (error) {
            console.error('Error updating user data:', error)
            toast({
                title: "Error",
                description: "No se pudo actualizar el perfil de usuario. Por favor, inténtalo de nuevo.",
                variant: "destructive",
            })
        } finally {
            setUpdating(false)
        }
    }

    if (loading) {
        return <div>Cargando datos de usuario...</div>
    }

    if (!userData) {
        return <div>No hay datos de usuario disponibles.</div>
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-6 bg-background">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        name="name"
                        value={userData.name ?? ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userData.email ?? ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={userData.password ?? ''}
                        onChange={handleInputChange}
                        placeholder="Deja en blanco para mantener la contraseña actual"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="identity">Número de Identidad</Label>
                    <Input
                        id="identity"
                        name="identity"
                        type="number"
                        value={userData.identity?.toString() ?? ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={userData.phone ?? ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                        id="city"
                        name="city"
                        value={userData.city ?? ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="md:col-span-2 flex justify-end mt-6">
                    <Button type="submit" disabled={updating} className='bg-[#f59e0b]'>
                        {updating ? 'Actualizando...' : 'Actualizar Perfil'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

