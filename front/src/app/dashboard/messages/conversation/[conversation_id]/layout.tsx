import QueryProvider from "@/components/Providers/query-provider";
import SocketProvider from "@/components/Providers/socket-provider";
import { auth } from "@/lib/user";
import { notFound } from "next/navigation";

export default async function ConversationLayout(
    {children}
    : {
        children: React.ReactNode
    }
) {

    const session = await auth();

    if (!session) {
        notFound();
    }

    const userId = session.sub;

    return (
        <QueryProvider>
            <SocketProvider
                userId={userId}
                socketUrl={process.env.SOCKET_URL!}
            >
                {children}
            </SocketProvider>
        </QueryProvider>
    )
}