'use client';

import { useSocket } from "@/components/Providers/socket-provider";
import { useState } from "react";

export default function ChatForm(
    {conversationId, userId}
    : {
        conversationId: string,
        userId: string;
    }
) {

    const [ msg, setMsg ] = useState('');
    const { socket } = useSocket();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        socket?.emit('send_message', {
            senderId: userId,
            conversationId,
            content: msg
        })
    }

    return (
        <form onSubmit={handleSubmit} className="flex">
            <input type="text" placeholder="Mensaje" name="message" className="grow bg-neutral-100 px-4 text-lg rounded-l-xl outline-none border border-transparent focus:border-blue-500" onChange={(e) => setMsg(e.target.value)} />
            <button className="p-4 text-white bg-green-700 rounded-r-xl">Enviar</button>
        </form>
    )
}