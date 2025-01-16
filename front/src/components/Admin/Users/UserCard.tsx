import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: string
  name: string | null
  email: string
  identity: number | null
  phone: string | null
  city: string | null
  role: string
  isEnabled: boolean
}

interface UserCardProps {
  user: User
  onBlock: (userId: string) => void
  onEnable: (userId: string) => void
  onRoleChange: (userId: string, newRole: string) => void
}

export function UserCard({ user, onBlock, onEnable, onRoleChange }: UserCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 overflow-clip text-wrap">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name || user.email}`} />
            <AvatarFallback>{(user.name || user.email).charAt(0)}</AvatarFallback>
          </Avatar>
          {user.name || user.email}
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-clip">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>City:</strong> {user.city || 'N/A'}</p>
        <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
        <Badge variant={user.isEnabled ? 'default' : 'destructive'}>
          {user.isEnabled ? 'Enabled' : 'Disabled'}
        </Badge>
        <div className="mt-4">
          <Select
            value={user.role}
            onValueChange={(newRole) => onRoleChange(user.id, newRole)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="owner">Owner</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="destructive" 
          onClick={() => onBlock(user.id)}
          disabled={!user.isEnabled}
        >
          Block User
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onEnable(user.id)}
          disabled={user.isEnabled}
        >
          Enable User
        </Button>
      </CardFooter>
    </Card>
  )
}

