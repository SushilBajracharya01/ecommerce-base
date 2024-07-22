import React, { ComponentType } from 'react'
import InputLabel from './InputLabel'
import { InputTypes } from '@/types';
import Password from './Password';

export default function Input({ label, name, className, required, type = "text", placeholder, isMulti, register,errors, disabled,onChange }: IInputProps) {
    let input = <input
        type={type}
        name={name}
        id={name}
        className={`${className ?? ""} p-2 shadow-sm focus:ring-primaryLight focus:outline-none focus:border-primaryLight block w-full sm:text-sm border-2 border-gray-300 rounded-md`}
        placeholder={placeholder}
        required={required}
        multiple={isMulti}
        disabled={disabled}
        {...(register ? { ...register(name) } : {})}
        {...(onChange ? onChange : {})}
    />
    
    if(type === "password") {
        input = <Password 
                    name={name}
                    className={className}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    register={register}
                    onChange={onChange}
                />
    }

    return (
        <div>
            {
                label &&
                <InputLabel
                    label={label}
                    name={name}
                />
            }

            <div className={`${label ? "mt-1" : ''}`}>
                {input}
            </div>

            { 
                errors && errors[name] && 
                <div className="text-red-500 text-xs mt-1">{errors[name].message}</div>
            }
        </div>
    )
}
interface IInputProps {
    label?: string;
    name: string;
    type?: InputTypes;
    register?: any;
    className?: string;
    required?: boolean;
    placeholder?: string;
    isMulti?: boolean;
    disabled?: boolean;
    errors?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}