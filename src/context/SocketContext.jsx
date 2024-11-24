'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connectSocket = () => {
      try {
        const initSocket = io(`${process.env.NEXT_PUBLIC_BASE_SOCKET_URL}`, {
          path: '/socket.io',
          reconnection: true,
          reconnectionAttempts: Infinity,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          transports: ['websocket', 'polling'],
        });
        setSocket(initSocket);
      } catch (error) {
        console.log('Error connecting socket', error);
      }
    };

    connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);


  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};