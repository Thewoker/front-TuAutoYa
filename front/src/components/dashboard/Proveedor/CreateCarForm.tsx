import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CarFormData {
  model: string
  brand: string
  price: number
  description: string
  image: string
}

interface AddCarFormProps {
  onSubmit: (data: CarFormData) => void
}

export function AddCarForm({ onSubmit }: AddCarFormProps) {
  const [formData, setFormData] = useState<CarFormData>({
    model: '',
    brand: '',
    price: 0,
    description: '',
    image: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'price' ? Number(value) : value 
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ model: '', brand: '', price: 0, description: '', image: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div>
        <Label htmlFor="brand">Marca</Label>
        <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="model">Modelo</Label>
        <Input id="model" name="model" value={formData.model} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="price">Precio por día</Label>
        <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="image">URL de la imagen</Label>
        <Input id="image" name="image" type="url" value={formData.image} onChange={handleChange} required />
      </div>
      <Button type="submit">Agregar Auto</Button>
    </form>
  )
}

