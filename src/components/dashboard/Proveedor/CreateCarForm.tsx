import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CarFormData {
  model: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  year: number;
  stock: number;
}

interface CloudinaryResult {
  info: {
    secure_url: string;
  };
}

export function AddCarForm({ onSubmit }: { onSubmit: (data: CarFormData) => void }) {
  const [formData, setFormData] = useState<CarFormData>({
    model: '',
    brand: '',
    price: 0,
    description: '',
    image: '',
    year: new Date().getFullYear(),
    stock: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: ['price', 'year', 'stock'].includes(name) ? Number(value) : value 
    }));
  };

  const handleImageUpload = (result: CloudinaryResult) => {
    console.log('Cloudinary upload result:', result);
    if (result.info && result.info.secure_url) {
      setFormData(prev => ({ ...prev, image: result.info.secure_url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    console.log('Cloudinary submit result', formData);
    setFormData({
      model: '',
      brand: '',
      price: 0,
      description: '',
      image: '',
      year: new Date().getFullYear(),
      stock: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="brand">Marca</Label>
        <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="model">Modelo</Label>
        <Input id="model" name="model" value={formData.model} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="year">Año</Label>
        <Input id="year" name="year" type="number" value={formData.year} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Precio por día</Label>
        <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="stock">Stock</Label>
        <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Imagen del coche</Label>
        <CldUploadWidget
          uploadPreset={`next-cloudinary-app`}
          onSuccess={(result) => {
            handleImageUpload(result as CloudinaryResult);
          }}
        >
          {({ open }) => (
            <Button type="button" onClick={() => open()}>
              Subir Imagen
            </Button>
          )}
        </CldUploadWidget>
        {formData.image && (
          <img src={formData.image} alt="Uploaded car" className="mt-2 max-w-xs rounded-md" />
        )}
      </div>
      <Button type="submit">Agregar Auto</Button>
    </form>
  );
}

