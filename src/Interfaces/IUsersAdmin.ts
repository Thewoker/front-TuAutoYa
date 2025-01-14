export interface User {
    id: string
    name: string | null
    email: string
    identity: number | null
    phone: string | null
    city: string | null
    role: string
    isEnabled: boolean
}

export interface UserCardProps {
    user: User
    onBlock: (userId: string) => void
    onEnable: (userId: string) => void
}