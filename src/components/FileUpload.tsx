"use client"
import React, { useState } from 'react'
import { CldUploadWidget, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import Input from './Input';

export default function FileUpload({ label, name, required, placeholder }: IFileUploadProps) {
    const [resources, setResources] = useState();
    return (
        <div>
            <Input
                label={label}
                name={name}
                required={required}
                placeholder={placeholder}
                type='file'
            />
        </div>
    )
}

interface IFileUploadProps {
    label?: string
    name: string
    required?: boolean
    placeholder?: string
}
