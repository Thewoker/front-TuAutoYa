import { auth, findUsers } from "@/lib/user";
import Link from "next/link";
import { InboxIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
export const dynamic = 'force-dynamic';

function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export default async function DashboardMessagesPage() {
    const session = await auth();

    if (!session || !session.sub) {
        return (
            <div className="flex flex-col gap-4 p-4">
                <p className="text-center text-xl py-8 text-red-500">
                    Error: No se pudo obtener la sesión. Por favor, inicia sesión nuevamente.
                </p>
            </div>
        );
    }

    const users = await findUsers(session.sub);

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="p-4 text-emerald-900 bg-amber-400 rounded-2xl text-3xl font-bold flex items-center gap-2">
                <InboxIcon className="w-8 h-8 text-emerald-900" />
                Bandeja de entrada
            </h1>

            {!users.length && (
                <p className="text-center text-xl py-8">No hay usuarios disponibles</p>
            )}

            {users.map((user: any) => (
                <Link
                    href={`/dashboard/messages/conversation/${user.id}`}
                    key={user.id}
                    className="flex justify-between items-center bg-zinc-200 hover:bg-emerald-950 p-4 rounded-xl"
                >
                    <div className="flex flex-col gap-2">
                        <p className="text-xl text-neutral-500 text-sky-500">{user.email}</p>
                        <h2 className="text-3xl font-bold text-amber-500">{user.name || "Sin Nombre"}</h2>
                        {user.lastMessage?.timestamp && ( // Si hay un mensaje reciente
                            <p className="text-sm text-gray-500">
                                Último mensaje: {formatDate(user.lastMessage.timestamp)}
                            </p>
                        )}
                    </div>
                    <ArrowRightIcon className="w-6 h-6 text-sky-500" />
                </Link>
            ))}
        </div>
    );
}
