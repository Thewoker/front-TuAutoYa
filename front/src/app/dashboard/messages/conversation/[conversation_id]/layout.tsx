// app/conversation/layout.tsx
import QueryProvider from "@/components/Providers/query-provider";
import SocketProvider from "@/components/Providers/socket-provider";
import { auth } from "@/lib/user";
import { notFound } from "next/navigation";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Autenticación de la sesión
  const session = await auth();

  // Si no hay sesión, redirigir al usuario a una página de error
  if (!session) {
    notFound(); // Esto genera una respuesta 404
  }

  const userId = session.sub; // Extraemos el ID del usuario desde la sesión

  return (
    <QueryProvider>
      {/* Proveedor del Socket, pasando el socketUrl y el userId */}
      <SocketProvider userId={userId} socketUrl={process.env.SOCKET_URL!}>
        {/* Los children serán las páginas o componentes hijos que usan este layout */}
        {children}
      </SocketProvider>
    </QueryProvider>
  );
}
