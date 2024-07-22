import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Password({name,className, placeholder, required, disabled, register, onChange}: IPasswordProps) {
    const [type, setType] = useState<"password" | "text">("password");

    const handleToggleInputType = () => {
        setType(type === "password" ? "text" : "password");
    }
  return (
    <div className="relative">
        <input
            type={type}
            name={name}
            id={name}
            className={`${className ?? ""} p-2 pr-8 shadow-sm focus:ring-primaryLight focus:outline-none focus:border-primaryLight block w-full sm:text-sm border-2 border-gray-300 rounded-md`}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            {...(register ? { ...register(name) } : {})}
            {...(onChange ? onChange : {})}
        />

        <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleToggleInputType}>
            {type === "password" ? 
                <FaEye />
                : 
                <FaEyeSlash />
            }
        </span>
    </div>
  )
}

interface IPasswordProps {
    name: string;
    className?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    register?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}