const UserCard = ({ status }) => {
    return (
        <div className="flex justify-between items-center py-2 px-6 gap-2">
            <div className={`avatar ${status}`}>
                <div className="w-8 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <span>ali</span>
        </div>
    )
}

export default UserCard