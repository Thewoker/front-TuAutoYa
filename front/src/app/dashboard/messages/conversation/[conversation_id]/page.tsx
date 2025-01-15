import { getOrCreateConversation } from "@/lib/conversation";
import { auth } from "@/lib/user";
import ChatForm from "./form";
import ChatMessages from "./messages";
import { cookies } from "next/headers";

export default async function ConversationPage(
    {params: paramsPromise}
    : {
        params: Promise<{
            conversation_id: string
        }>
    }
) {
    const cookiesStore = await cookies();
    const session = await auth();
    const userId = session.sub;

    const params = await paramsPromise;
    const conversationId = params.conversation_id;

    const conversation = await getOrCreateConversation(userId, conversationId);

    if (!conversation) {
        return <p>Failed to get conversation</p>
    }

    const { memberOne, memberTwo } = conversation;

    const otherMember = memberOne.id === userId ? memberTwo : memberOne

    return (
        <div className="flex flex-col min-h-screen max-h-screen p-8">
            <div className="p-4 flex flex-col gap-2">
                <p className="text-neutral-500">{otherMember.email}</p>
                <h2 className="text-3xl font-bold text-amber-500">{otherMember.name || 'Sin nombre'}</h2>
            </div>
            <hr />
            <ChatMessages conversationId={conversation.id} token={cookiesStore.get('access_token')?.value || ''} userId={userId}
             />
             
            <ChatForm conversationId={conversation.id} userId={userId} />
        </div>
    )
}