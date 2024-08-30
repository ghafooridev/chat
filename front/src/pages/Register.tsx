import { ChangeEvent, useState } from "react";
import Input from "src/component/Inputs";
import { HttpMethod } from "src/helpers/constants";
import useMutation from "src/hooks/useMutation";
import { NewUser } from "src/types";

const Register = () => {
  const [inputs, setInputs] = useState<Partial<NewUser>>()
  const { execute } = useMutation();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value })
  }

  const onSubmit = () => {
    console.log(inputs);

    execute({ url: `user`, body: inputs, method: HttpMethod.POST });
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Register
        </h1>
        <form className="space-y-4">
          <Input label="First Name" name="firstName" placeholder="First Name" onChange={onChangeInput} />
          <Input label="Last Name" name="lastName" placeholder="Last Name" onChange={onChangeInput} />
          <Input label="Email" name="email" placeholder="Email" onChange={onChangeInput} />
          <Input label="Password" name="password" type="password" placeholder="Password" onChange={onChangeInput} />

          <div>
            <button className="btn btn-block btn-primary text-white" onClick={onSubmit}>Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register