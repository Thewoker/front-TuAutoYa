'use client';

import { useSocket } from "@/components/Providers/socket-provider";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useChat = (
    { apiUrl, conversationId, queryKey, token }
    : {
        apiUrl: string;
        conversationId: string;
        queryKey: string;
        token: string;
    }
) => {

    const { isConnected } = useSocket();

    const getMessages = async ({ pageParam = undefined }: { pageParam?: number }) => {
        try {
            const rq = await fetch(`${apiUrl}/messages?conversationId=${conversationId}`, {
                credentials: 'include',
                cache: 'no-store',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!rq.ok) {
                throw new Error(rq.statusText);
            }

            const data = await rq.json();
            return data;

        } catch (e) {
            console.error(e);
            throw e;
        }
    };

    const {
        data,
        isError,
        isPending,
        error,
    } = useInfiniteQuery({
        queryKey: [queryKey],
        initialPageParam: undefined,
        queryFn: getMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: isConnected ? false : 1000
    });

    return {
        data,
        isError,
        isPending,
        error
    };
};
