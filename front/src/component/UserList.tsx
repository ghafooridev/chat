import useQuery from "src/hooks/useQuery";
import UserCard from "./UserCard"
import { User } from "src/types";
import { useEffect } from "react";
import useConversation from "src/store";

const UserList = () => {
  const { data } = useQuery<User[]>('/user');
  const { setUsers, users } = useConversation()

  useEffect(() => {
    if (data) setUsers(data)
  }, [data]);

  return (
    <div className="flex flex-col gap-2 py-4 bg-gray-700 rounded-md min-w-[300px]">
      {users?.map((item: User) => {
        return (
          <div key={item.id}>
            <UserCard  {...item} />
          </div>
        )
      })}
    </div>
  )
}

export default UserList