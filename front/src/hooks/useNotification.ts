import { useEffect } from "react";
import { useSocketContext } from "src/contexts/socket"
import { useUserContext } from "src/contexts/user";
import useConversation from "src/store";

const useNotification = () => {
  const { socket } = useSocketContext();
  const { setNotifications, notifications } = useConversation();
  const { user } = useUserContext();

  useEffect(() => {
    socket?.on("notification", (newMessage) => {
      if (newMessage[0].senderId !== user?.id) {
        if (!notifications.includes(newMessage[0].senderId)) {
          setNotifications([...notifications, newMessage[0].senderId])
        }
      }
    });

    return () => { socket?.off("notification") }
  }, [socket, setNotifications, notifications])
}

export default useNotification