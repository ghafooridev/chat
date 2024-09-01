import { FC } from "react"
import { useSocketContext } from "src/contexts/socket";
import useConversation from "src/store";
import { User } from "src/types"


const UserCard: FC<User> = (props) => {
  const { firstName, lastName, avatar, id } = props;
  const { selectedConversation, setSelectedConversation, notifications, setNotifications } = useConversation();
  const isSelected = selectedConversation?.id === id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers?.includes(props.id)

  const onClickUser = () => {
    setSelectedConversation(props)
    if (notifications.includes(props.id)) setNotifications(notifications.filter(item => item !== props.id))
  }

  return (
    <div className={`w-full flex justify-between items-center py-2 px-6 cursor-pointer hover:bg-primary ${isSelected && 'bg-primary'}`} onClick={onClickUser}>
      <div className='flex justify-start items-center  gap-4' >
        <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
          <div className="w-8 rounded-full">
            <img src={avatar!} alt={id} />
          </div>
        </div>
        <span className="text-white">{firstName} {lastName}</span>

      </div>
      {notifications.includes(props.id) && <div className="badge badge-success badge-xs"></div>}
    </div>
  )
}

export default UserCard