"use client"

import { ComponentProps } from "react"
import { useFormStatus } from "react-dom";
import { VscLoading } from "react-icons/vsc";

export default function FormSubmitButton({ children, className, ...props }: FormSubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button
            {...props}
            className={` px-4 py-2 flex items-center font-medium rounded-md shadow-sm text-white bg-primary ${className}`}
            type="submit"
        >
            {
                pending &&
                <VscLoading className="animate-spin mr-2" />
            }
            {children}
        </button>
    )
}

type FormSubmitButtonProps = {
    children: React.ReactNode,
    className?: string,
} & ComponentProps<"button">