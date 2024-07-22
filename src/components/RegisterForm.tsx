"use client"

import { useState } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerFormValidation } from "@/app/validations";
import { VscLoading } from "react-icons/vsc";
import { createUser } from "@/app/actions/register.actions";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit, 
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "", 
            email: "", 
            password: ""
        },
        resolver: yupResolver(registerFormValidation),
    });

    const handleFormSubmit = async(data: IRegisterFormData) => {
        setIsLoading(true);
        const result = await createUser(data);
        if(!result?.success) {
            setIsLoading(false);
            return toast.error(result?.message);
        }
        else{
            toast.success("User created successfully");
            router.push('/login');
        }
        setIsLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-4">
                <Input
                    label="Full Name"
                    name="name"
                    placeholder="Full Name"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                />
            </div>

            <div className="mb-4">
                <Input
                    label="Email address"
                    name="email"
                    placeholder="Email"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                />
            </div>

            <div className="mb-6">
                <Input
                    label="Password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                />
            </div>

            <button
                className="w-full flex justify-center bg-green-600 text-white py-2 rounded-lg outline-green-700"
                disabled={isLoading}
                >
                    {
                        isLoading ?
                            <VscLoading className="animate-spin" />
                            :
                            "Register"
                    }
            </button>
        </form>
    )
}

interface IRegisterFormData {
    name: string
    email: string
    password: string
}