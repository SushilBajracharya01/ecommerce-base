import React from 'react'
import InputLabel from './InputLabel'
import { IOptions, InputTypes } from '@/types';

export default function Select({ label, name, className, required, isMulti, options }: ISelectProps) {
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
                <select
                    name={name}
                    id={name}
                    required={required}
                    multiple={isMulti}
                    className={`${className ?? ""} p-2 shadow-sm focus:ring-primaryLight focus:border-primaryLight block w-full sm:text-sm border-2 border-gray-300 rounded-md`}
                >
                    {
                        options.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>))
                    }
                </select>
            </div>
        </div>
    )
}
interface ISelectProps {
    label?: string;
    name: string;
    className?: string;
    required?: boolean;
    isMulti?: boolean;
    options: IOptions[]
}