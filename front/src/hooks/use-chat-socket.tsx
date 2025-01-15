import { useSocket } from "@/components/Providers/socket-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useChatSocket(
    {queryKey, addMessageKey}
    : {
        queryKey: string;
        addMessageKey: string
    }
) {

    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {

        if (!socket) return;

        socket?.on(addMessageKey, (message) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [
                            {
                                messages: [message],
                                nextCursor: null
                            }
                        ]
                    };
                }

                let newData = [...oldData.pages];

                newData[0] = {
                    ...newData[0],
                    messages: [
                        ...newData[0].messages,
                        message,
                    ]
                }

                return {
                    ...oldData,
                    pages: newData
                }
            })
        })

        return () => {
            socket.removeAllListeners(addMessageKey)
        }

    }, [socket, queryClient, addMessageKey])
    
}