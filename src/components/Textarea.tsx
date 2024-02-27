import React, { ComponentType } from 'react'
import InputLabel from './InputLabel';

export default function TextArea({ label, name, className, required, placeholder }: ITextAreaProps) {
    return (
        <div>
            {
                label &&
                <InputLabel
                    label={label}
                    name={name}
                />
            }
            <div className="mt-1">
                <textarea
                    name={name}
                    id={name}
                    className={`${className ?? ""} p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md`}
                    placeholder={placeholder}
                    required={required}
                />
            </div>
        </div>
    )
}

interface ITextAreaProps {
    label?: string;
    name: string;
    className?: string;
    required?: boolean;
    placeholder?: string;
}