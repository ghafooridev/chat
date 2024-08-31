import { FC } from "react"
import { useSocketContext } from "src/contexts/socket";
import useConversation from "src/store";
import { User } from "src/types"


const UserCard: FC<User> = (props) => {
    const { firstName, lastName, avatar, id } = props;
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?.id === id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers?.includes(props.id)

    const onClickUser = () => {
        setSelectedConversation(props)
    }

    return (
        <div className={`flex justify-start items-center py-2 px-6 gap-4 cursor-pointer hover:bg-primary ${isSelected && 'bg-primary'}`} onClick={onClickUser}>
            <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                <div className="w-8 rounded-full">
                    <img src={avatar!} alt={id} />
                </div>
            </div>
            <span>{firstName} {lastName}</span>
        </div>
    )
}

export default UserCard