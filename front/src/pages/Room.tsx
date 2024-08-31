import MessageInput from "src/component/MessageInput";
import ChatBox from "../component/MessageBox"
import UserList from "../component/UserList"
import RoomHeader from "src/component/RoomHeader";

const Room = () => {
  return (
    <div className="mx-0 lg:mx-40 h-full ">
      <RoomHeader />
      <div className="flex items-stretch">
        <UserList />
        <div className="flex flex-col w-full pl-8 ">
          <div className="w-full  max-h-[500px] pr-2 overflow-auto">
            <ChatBox />
          </div>
          <MessageInput />
        </div>
      </div>
    </div>
  )
}

export default Room