'use client';
import { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const SocketProvider = ({ children, user }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        console.log('useEffect running')
        const connectSocket = () => {
            try {
                const initSocket = io(`${process.env.NEXT_PUBLIC_BASE_SOCKET_URL}`, {
                    reconnection: true,
                    reconnectionAttempts: Infinity,
                    reconnectionDelay: 1000,
                    reconnectionDelayMax: 5000,
                    transports: ['websocket'],
                    // query: {
                    //     userId: user?.usr_id_pk
                    // }
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
    }, [user]);

    console.log('socket', socket)
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketProvider };
