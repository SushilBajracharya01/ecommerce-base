import React, { ComponentType } from 'react'
import InputLabel from './InputLabel'
import { InputTypes } from '@/types';

export default function Input({ label, name, className, required, type = "text", placeholder, isMulti }: IInputProps) {
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
                <input
                    type={type}
                    name={name}
                    id={name}
                    className={`${className ?? ""} p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md`}
                    placeholder={placeholder}
                    required={required}
                    multiple={isMulti}
                />
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
}