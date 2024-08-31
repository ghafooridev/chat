import useConversation from "src/store"
import { useEffect } from "react"
import MessageDialog from "./MessageDialog"
import { Message } from "src/types"
import useQuery from "src/hooks/useQuery"
import useListenMessage from "src/hooks/useListenMessage"

const MessageList = () => {
  const { messages, setMessages, selectedConversation } = useConversation()
  const { data } = useQuery<Message[]>(`/message/${selectedConversation?.id}`)
  useListenMessage()
  useEffect(() => {
    if (data) { setMessages(data) }
  }, [data])
  console.log(messages)
  return (
    <div>
      {messages?.map((item: Message) => {
        return (
          <div key={item.id}>
            <MessageDialog {...item} />
          </div>
        )
      })}

    </div>
  )
}

export default MessageList