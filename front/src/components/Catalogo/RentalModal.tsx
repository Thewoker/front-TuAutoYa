import React, { useState } from 'react'
import { format, differenceInDays } from 'date-fns'
import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"

interface RentalModalProps {
  isOpen: boolean
  onClose: () => void
  car: {
    id: string
    model: string
    brand: string
    price: number
    image: string
    description: string
  }
}

export function RentalModal({ isOpen, onClose, car }: RentalModalProps) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const calculateTotal = () => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const days = differenceInDays(end, start) + 1 // Include both start and end day
      return days * car.price
    }
    return 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', { carId: car.id, startDate, endDate, total: calculateTotal() })
    onClose()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-xl font-semibold text-gray-900">
            Reservar {car.brand} {car.model}
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600">
            Ingrese las fechas de su alquiler para calcular el total.
          </Dialog.Description>
          <form onSubmit={handleSubmit}>
            <fieldset className="mb-4 flex items-center gap-4">
              <label className="w-24 text-right text-sm text-gray-700" htmlFor="start-date">
                Fecha inicio
              </label>
              <input
                className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="mb-4 flex items-center gap-4">
              <label className="w-24 text-right text-sm text-gray-700" htmlFor="end-date">
                Fecha fin
              </label>
              <input
                className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </fieldset>
            <div className="mb-6 flex items-center gap-4">
              <span className="w-24 text-right text-sm font-semibold text-gray-700">Total:</span>
              <span className="flex-1 text-lg font-bold text-green-600">${calculateTotal()}</span>
            </div>
            <div className="mt-6 flex justify-end">
              <Dialog.Close asChild>
                <button
                  type="submit"
                  className="inline-flex h-9 items-center justify-center rounded bg-green-500 px-4 font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Reservar ahora
                </button>
              </Dialog.Close>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="absolute right-3.5 top-3.5 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

