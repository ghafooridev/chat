import { FC, InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label: string }

const Input: FC<InputProps> = ({ label, ...rest }) => {
    return (
        <div>
            <label className="label">
                <span className="text-base label-text text-black">{label}</span>
            </label>
            <input {...rest} className="w-full input input-bordered bg-white" />
        </div>
    )
}

export default Input;