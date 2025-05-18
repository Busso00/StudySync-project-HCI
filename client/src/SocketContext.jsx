import React, { useState, useEffect, createContext, useContext } from 'react';

export const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(() => {
    const savedSocket = localStorage.getItem('socket');
    return savedSocket ? savedSocket : null;
  });

  useEffect(() => {
    if (socket) {
      localStorage.setItem('socket', socket);
    } else {
      localStorage.removeItem('socket');
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
