"use client"

import { ComponentProps } from "react"
import { useFormStatus } from "react-dom";

export default function FormSubmitButton({ children, className, ...props }: FormSubmitButtonProps) {
    const {pending } = useFormStatus();
    return (
        <button
        {...props}
        className={` px-4 py-2 font-medium rounded-md shadow-sm text-white bg-primary ${className}`}
        type="submit"
        >
            {
                pending &&
                <span className="loading loading-spinner loading-sm mr-2"></span>
            }
            {children}
        </button>
    )
}

type FormSubmitButtonProps = {
    children: React.ReactNode,
    className?: string,
} & ComponentProps<"button">