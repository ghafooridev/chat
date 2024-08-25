const Login = () => {
    return (
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
            <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-700">
                    Login To Chat
                </h1>
                <form className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="text-base label-text text-black">Email</span>
                        </label>
                        <input type="text" placeholder="Email Address" className="w-full input input-bordered bg-white" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text text-black">Password</span>
                        </label>
                        <input type="password" placeholder="Enter Password" className="w-full input input-bordered bg-white" />
                    </div>
                    <div>
                        <button className="btn btn-block btn-primary text-white">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login