import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddCarFormProps, CloudinaryResult, CarFormData} from "@/Interfaces/ICreateCar"

export function AddCarForm({ onSubmit }: AddCarFormProps) {
  const [formData, setFormData] = useState<CarFormData>({
    brand: '',
    model: '',
    year: new Date().getFullYear().toString(),
    pricePerDay: 0,
    image: '',
    description: '',
    transmission: '',
    fuelType: '',
    kilometer: '',
    brakes: '',
    approvalStatus: 'pending',
    rating: 0,
    status: 'active',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: ['pricePerDay', 'rating'].includes(name) ? Number(value) : value 
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (result: CloudinaryResult) => {
    if (result.info && result.info.secure_url) {
      setFormData(prev => ({ ...prev, image: result.info.secure_url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      brand: '',
      model: '',
      year: new Date().getFullYear().toString(),
      pricePerDay: 0,
      image: '',
      description: '',
      transmission: '',
      fuelType: '',
      kilometer: '',
      brakes: '',
      rating: 0,
      status: 'active',
      approvalStatus: 'pending',
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
        <Input id="year" name="year" value={formData.year} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pricePerDay">Precio por día</Label>
        <Input id="pricePerDay" name="pricePerDay" type="number" value={formData.pricePerDay} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="transmission">Transmisión</Label>
        <Select name="transmission" value={formData.transmission} onValueChange={(value) => handleSelectChange('transmission', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione la transmisión" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="automatic">Automática</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fuelType">Tipo de combustible</Label>
        <Select name="fuelType" value={formData.fuelType} onValueChange={(value) => handleSelectChange('fuelType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el tipo de combustible" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gnc">Gas</SelectItem>
            <SelectItem value="nafta">Gasolina</SelectItem>
            <SelectItem value="diesel">Diesel</SelectItem>
            <SelectItem value="electric">Eléctrico</SelectItem>
            <SelectItem value="hybrid">Híbrido</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="kilometer">Kilometraje</Label>
        <Input id="kilometer" name="kilometer" value={formData.kilometer} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="brakes">Frenos</Label>
        <Input id="brakes" name="brakes" value={formData.brakes} onChange={handleChange} required />
      </div>
      {/* <div className="space-y-2">
        <Label htmlFor="rating">Calificación</Label>
        <Input id="rating" name="rating" type="number" min="0" max="5" step="0.1" value={formData.rating} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Estado</Label>
        <Select name="status" value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Activo</SelectItem>
            <SelectItem value="inactive">Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
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

