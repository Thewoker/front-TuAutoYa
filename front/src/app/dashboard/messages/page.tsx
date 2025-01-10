import { auth, findUsers } from "@/lib/user"
import Link from "next/link";

export default async function DashboardMessagesPage() {

    const session = await auth();

    const users = await findUsers(session.sub);

    return (
        <div className="flex flex-col gap-4 p-4">
            { !users.length && <p className="text-center text-xl py-8">No hay usuarios disponibles</p> }
            { users.map((user: any) => (
                <Link href={`/dashboard/messages/conversation/${user.id}`} key={user.id} className="flex flex-col gap-2 hover:bg-neutral-100 p-4 rounded-xl">
                    <p className="text-xl text-neutral-500">{user.email}</p>
                    <h2 className="text-3xl font-bold">{user.name || 'Sin Nombre'}</h2>
                </Link>
            )) }
        </div>
    )
}