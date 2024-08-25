import ChatBox from "../component/ChatBox"
import UserList from "../component/UserList"

const Room = () => {
    return (
        <div className="flex items-start">
            <UserList />
            <div className="w-full p-4">
                <ChatBox />
            </div>
        </div>
    )
}

export default Room