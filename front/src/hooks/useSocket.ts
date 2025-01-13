import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL; // URL del servidor backend1

interface Message {
  sender: string;
  content: string;
}

export const useSocket = (role: 'admin' | 'proveedor') => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, { query: { role } });
    setSocket(socketInstance);

    socketInstance.on('receiveMessage', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [role]);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.emit('sendMessage', { sender: role, content: message });
    }
  };

  return { messages, sendMessage };
};
