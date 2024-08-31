import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useUserContext } from "./user";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "src/helpers/constants";

type SocketContextType = {
  socket: Socket | null
  onlineUsers: string[] | null;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

export const SocketContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [socket, setSocket] = useState<Socket | null>(null)
  const [onlineUsers, setOnlineUser] = useState([])

  const { user } = useUserContext()
  useEffect(() => {
    if (user) {
      const _socket = io(BASE_URL, {
        query: {
          userId: user.id
        }
      })
      setSocket(_socket);

      _socket?.on("getOnlineUsers", (users) => {
        setOnlineUser(users)
      })
    }
    else {
      if (socket) {
        socket.close()
        setSocket(null)
      }
    }
  }, [user])

  const ContextValue = useMemo(() => ({ socket, onlineUsers }), [socket, onlineUsers])

  return (
    <SocketContext.Provider value={ContextValue}>
      {children}
    </SocketContext.Provider>
  )
}