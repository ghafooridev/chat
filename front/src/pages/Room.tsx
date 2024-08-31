import ChatBox from "../component/MessageBox"
import UserList from "../component/UserList"
import RoomHeader from "src/component/RoomHeader";

const Room = () => {
  return (
    <div className="mx-0 lg:mx-40 h-full ">
      <RoomHeader />
      <div className="flex items-stretch">
        <UserList />
        <div className="w-full p-4">
          <ChatBox />
        </div>
      </div>
    </div>
  )
}

export default Room