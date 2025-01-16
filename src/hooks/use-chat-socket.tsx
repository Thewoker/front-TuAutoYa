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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    
                // Si hay datos anteriores, agrega el nuevo mensaje
                const lastPageIndex = oldData.pages.length - 1;
                oldData.pages[lastPageIndex].messages.push(message);
                return { ...oldData };
            });
        });
    
        // Limpia el evento cuando el componente se desmonte
        return () => {
            socket?.off(addMessageKey);
        };
    }, [socket, queryClient,  addMessageKey,queryKey]); // Agrega queryKey a las dependencias
    
}