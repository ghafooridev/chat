import useConversation from "src/store"
import { useEffect, useRef } from "react"
import MessageDialog from "./MessageDialog"
import { Message } from "src/types"
import useQuery from "src/hooks/useQuery"
import useListenMessage from "src/hooks/useListenMessage"

const MessageList = () => {
  const { messages, setMessages, selectedConversation } = useConversation()
  const { data } = useQuery<Message[]>(`/message/${selectedConversation?.id}`)
  const lastMessageRef = useRef<HTMLDivElement>(null)

  useListenMessage()

  useEffect(() => {
    if (data) { setMessages(data) }
  }, [data])


  useEffect(() => {
    setTimeout(() => { lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" }) }, 100)
  }, [messages])



  return (
    <div>
      {messages?.map((item: Message) => {
        return (
          <div key={item.id} ref={lastMessageRef}>
            <MessageDialog {...item} />
          </div>
        )
      })}

    </div>
  )
}

export default MessageList