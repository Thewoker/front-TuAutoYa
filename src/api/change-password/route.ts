import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { newPassword } = body;

  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json(
      { message: "La contraseña debe tener al menos 6 caracteres" },
      { status: 400 }
    );
  }

  console.log("Contraseña cambiada:", newPassword);

  return NextResponse.json({ message: "Contraseña cambiada con éxito" });
}
