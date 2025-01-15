
'use client';

import { useSocket } from "@/components/Providers/socket-provider";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";  // Importa el picker de emojis

export default function ChatForm({ conversationId, userId }: { conversationId: string, userId: string }) {
    const [msg, setMsg] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);  // Estado para controlar la visibilidad del picker
    const { socket } = useSocket();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Emitir el mensaje con el contenido (que puede incluir emojis)
        socket?.emit('send_message', {
            senderId: userId,
            conversationId,
            content: msg
        });

        setMsg(''); // Limpiar el campo de mensaje después de enviarlo
    };

    const handleEmojiClick = (emoji: { emoji: string }) => {
        setMsg(msg + emoji.emoji); // Agregar el emoji al mensaje
    };

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    placeholder="Mensaje"
                    className="grow bg-neutral-100 px-4 text-lg rounded-l-xl outline-none border border-transparent focus:border-blue-500"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <button className="p-4 text-white bg-amber-500 rounded-r-xl">Enviar</button>
            </form>

            {/* Botón para mostrar el selector de emojis */}
            <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute top-2 right-20 p-2 text-xl"
            >
                😀
            </button>

            {/* Mostrar el selector de emojis si showEmojiPicker es true */}
            {showEmojiPicker && (
                <div className="absolute bottom-16 z-10">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
}
