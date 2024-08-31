import Input from "src/component/SimpleInput";
import { HttpMethod } from "src/helpers/constants";
import { useForm, SubmitHandler } from "react-hook-form"
import useMutation from "src/hooks/useMutation";
import { User } from "src/types";
import { useEffect } from "react";
import { useUserContext } from "src/contexts/user";

const Login = () => {
    const { execute, data } = useMutation<User>();
    const { handleSubmit, register, formState: { errors } } = useForm<User>()
    const { setUser } = useUserContext()

    const onSubmit: SubmitHandler<User> = (data: User) => {
        execute({ url: `user/signin`, body: data, method: HttpMethod.POST });
    }

    useEffect(() => {
        if (data) {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data)
        }
    }, [data])
    return (
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
            <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-700">
                    Login To Chat
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    <Input
                        register={register("email", { required: "Email is Required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Email Is Not Valid" } })}
                        error={errors.email}
                        label="Email" name="email" placeholder="Email" />

                    <Input
                        register={register("password", { required: "Password is Required", minLength: { value: 6, message: "Password Should have at least 6 characters" } })}
                        error={errors.password}
                        label="Password" name="password" placeholder="Password" type="password" />

                    <div>
                        <input type="submit" value="Login" className="btn btn-block btn-primary text-white" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login