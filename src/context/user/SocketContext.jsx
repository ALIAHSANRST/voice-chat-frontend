'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { COMMON_CONTEXT } from '@/src/context';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { currentUser, token } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

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
          query: {
            jwt_token: token,
          }
        });
        setSocket(initSocket);
      } catch (error) {
        console.error('Error connecting socket', error);
      }
    };

    connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};