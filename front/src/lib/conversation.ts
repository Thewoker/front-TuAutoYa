import { cookies } from "next/headers";

export async function getOrCreateConversation(memberOneId: string, memberTwoId: string) {
    try {
        const cookiesStore = await cookies();

        const rq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversation`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ memberOneId, memberTwoId }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookiesStore.get('access_token')?.value || ''}`
            }
        })

        if (!rq.ok) {
            return null;
        }

        const conversation = await rq.json();

        return conversation;
    }catch (e) {
        console.error(e);
        throw new Error('Failed to get conversation')
    }
}