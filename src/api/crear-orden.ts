import { NextApiRequest, NextApiResponse } from 'next';

type Orden = {
  id: number;
  nombre: string;
  email: string;
  fechaInicio: string;
  fechaFin: string;
  autoSeleccionado: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nombre, email, fechaInicio, fechaFin, autoSeleccionado }: Orden = req.body;

    // Aquí puedes agregar la lógica para guardar la orden en una base de datos
    // Por ejemplo, utilizando Prisma o cualquier otra herramienta de tu elección

    // Simulando la creación de la orden
    const orden: Orden = {
      id: Date.now(),
      nombre,
      email,
      fechaInicio,
      fechaFin,
      autoSeleccionado,
    };

    // Retornar la orden creada como respuesta
    res.status(200).json(orden);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
