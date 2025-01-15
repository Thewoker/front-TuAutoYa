// app/providers/socket-provider.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface ISocketContext {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContext>({ socket: null, isConnected: false });

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({
  children,
  socketUrl,
  userId,
}: {
  children: React.ReactNode;
  socketUrl: string;
  userId: string;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(socketUrl, { auth: { userId } });

    socketInstance.on('connect', () => {
      setIsConnected(true);
    });
    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [socketUrl, userId]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
