import useConversation from "src/store"
import { useEffect } from "react"
import MessageDialog from "./MessageDialog"
import { Message } from "src/types"
import useQuery from "src/hooks/useQuery"

const MessageList = () => {
  const { messages, setMessages, selectedConversation } = useConversation()
  const { data } = useQuery<Message[]>(`/message/${selectedConversation?.id}`)

  useEffect(() => {
    if (data) { setMessages(data) }
  }, [data])

  return (
    <>
      {messages?.map((item: Message) => {
        return (
          <div key={item.id}>
            <MessageDialog {...item} />
          </div>
        )
      })}

    </>
  )
}

export default MessageList