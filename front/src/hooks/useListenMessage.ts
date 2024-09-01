import { useEffect } from "react";
import { useSocketContext } from "src/contexts/socket"
import useConversation from "src/store";

const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation()

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage[0]]);
    });
    return () => { socket?.off("newMessage") }
  }, [socket, messages, setMessages])
}

export default useListenMessage