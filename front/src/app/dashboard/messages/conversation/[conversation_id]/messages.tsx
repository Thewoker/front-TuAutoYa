'use client'

import { useChat } from "@/hooks/use-chat"
import useChatSocket from "@/hooks/use-chat-socket";

export default function ChatMessages(
    { token, conversationId, userId }
    : {
        token: string;
        conversationId: string;
        userId: string;
    }
) {
    const queryKey = 'chat:messages'

    const { data, isError, error, isPending } = useChat({
        apiUrl: process.env.NEXT_PUBLIC_API_URL!,
        conversationId,
        queryKey,
        token
    })

    useChatSocket({ addMessageKey: `[new-message]:${conversationId}`, queryKey })

    if (isError) {
        return (
            <p>{error?.message || error?.name}</p>
        )
    }

    if (isPending) {
        return (
            <p>Loading...</p>
        )
    }

    return (    
        <div className="p-4 flex flex-col gap-4 grow overflow-y-auto">
            {data?.pages.map((page) => (
                page.messages.map((msg: any) => (
                    <div key={msg.id} className={`flex flex-col gap-2 w-fit max-w-1/2 ${msg.sender.id === userId ? 'self-end bg-sky-500' : 'bg-emerald-950'} py-2 px-4 rounded-bl-xl text-white rounded-r-lg`}>
                        {/* Use React Timeago for timestamps */}
                        <div>
                            <p>{msg.content}</p>
                        </div>
                    </div>
                ))
            ))}
        </div>
    )
}