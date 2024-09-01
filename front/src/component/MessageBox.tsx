import useConversation from "src/store"
import NoSelectedChat from "./NoSelectedChat"
import { useEffect } from "react"
import MessageList from "./MessageList"

const MessageBox = () => {
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
        </div>}
    </>
  )
}

export default MessageBox