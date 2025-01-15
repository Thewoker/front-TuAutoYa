import { cookies } from "next/headers"

export const auth = async () => {
    try {
        const cookiesStore = await cookies();

        const rq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${cookiesStore.get('access_token')?.value || ''}`
            }
        })

        if (!rq.ok) {
            return null;
        }

        const data = await rq.json();

        return data;
    }catch (e) {
        console.error(e);

        throw new Error('Failed to get session');
    }
}

export const findUsers = async (userId: string) => {
    try {
        const cookiesStore = await cookies();

        const rq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${cookiesStore.get('access_token')?.value || ''}`
            }
        })

        if (!rq.ok) {
            return null;
        }

        const data = await rq.json();

        // const users = (await rq.json()).filter((user: any) => user.id !== userId)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
        const users = data.filter((user: any) => user.id !== userId)

        return users;
    }catch (e) {
        console.error(e);

        throw new Error('Failed to get users');
    }
}