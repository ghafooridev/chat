import useConversation from "src/store"
import NoSelectedChat from "./NoSelectedChat"
import { useEffect } from "react"
import MessageInput from "./MessageInput"
import MessageList from "./MessageList"

const ChatBox = () => {
  const { setSelectedConversation, selectedConversation } = useConversation()

  //for clear conversation after loging out
  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [])

  return (
    <>
      {!selectedConversation ? <NoSelectedChat /> :
        <div>
          <MessageList />
          <MessageInput />
        </div>}
    </>
  )
}

export default ChatBox