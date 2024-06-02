import React, { ComponentType } from 'react'
import InputLabel from './InputLabel'
import { InputTypes } from '@/types';

export default function Input({ label, name, className, required, type = "text", placeholder, isMulti, onChange }: IInputProps) {
    let input = null;

    if (onChange) {
        input = <input
            type={type}
            name={name}
            id={name}
            className={`${className ?? ""} p-2 shadow-sm focus:ring-primaryLight focus:border-primaryLight block w-full sm:text-sm border-2 border-gray-300 rounded-md`}
            placeholder={placeholder}
            required={required}
            multiple={isMulti}
            onChange={(e) => onChange(e)}
        />
    }
    else {
        input = <input
            type={type}
            name={name}
            id={name}
            className={`${className ?? ""} p-2 shadow-sm focus:ring-primaryLight focus:border-primaryLight block w-full sm:text-sm border-2 border-gray-300 rounded-md`}
            placeholder={placeholder}
            required={required}
            multiple={isMulti}
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
        </div>
    )
}
interface IInputProps {
    label?: string;
    name: string;
    type?: InputTypes;

    className?: string;
    required?: boolean;
    placeholder?: string;
    isMulti?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}