import { ChangeEvent, useState, KeyboardEvent } from "react"
import SendIcon from "src/icons/Send";
import useConversation from "src/store"
import { useEffect } from "react"
import useMutation from "src/hooks/useMutation"
import { Message } from "src/types"
import { HttpMethod } from "src/helpers/constants"

const MessageInput = () => {
  const [messageValue, setMessageValue] = useState('');
  const { selectedConversation, messages, setMessages } = useConversation()

  const { execute, data } = useMutation<Message>();

  const onSendMessage = () => {
    if (messageValue.length) {
      execute({ url: `message/send/${selectedConversation?.id}`, body: { content: messageValue }, method: HttpMethod.POST });
    }
  }


  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessageValue(value)
  }


  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'NumpadEnter') onSendMessage()
  };

  useEffect(() => {
    if (data) {
      setMessages([...messages, data]);
      setMessageValue('')
    }
  }, [data])

  return (
    <div className="flex w-full mt-4 gap-2">
      <label className="input input-bordered flex items-center gap-2 w-full">
        <input type="text" className="grow" placeholder="Type Here ..." value={messageValue} onChange={onChangeInput} onKeyDown={onPressEnter} />
      </label>
      <button className="btn btn-square btn-ghost " onClick={onSendMessage}>
        <SendIcon />
      </button>
    </div>
  )
}

export default MessageInput