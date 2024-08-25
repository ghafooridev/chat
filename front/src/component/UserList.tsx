import UserCard from "./UserCard"

const UserList = () => {
    return (
        <div className="flex flex-col gap-2 py-4 bg-gray-700 rounded-md w-[300px]">
            <UserCard status="online" />
            <UserCard status="offline" />
        </div>
    )
}

export default UserList