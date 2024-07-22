"use client"
import { signIn } from "next-auth/react";
import Input from "./Input";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import {useForm} from 'react-hook-form';
import { loginFormValidation } from "@/app/validations";
import {yupResolver} from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { VscLoading } from "react-icons/vsc";

export default function LoginForm() {
    const router = useRouter();
    const {
        register, 
        formState: { errors },
        handleSubmit
    } = useForm({
        defaultValues: {
            email: "", 
            password: ''
        },
        resolver: yupResolver(loginFormValidation),
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (data:ILoginFormData) => {
        setIsLoading(true);
        const response = await signIn('credentials', { ...data, redirect: false });
        if(response?.error) {
            setIsLoading(false);
            return toast.error(response.error);
        }
        router.push("/");
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                    type="password"
                    placeholder="Password"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                />
            </div>

            <button
                type="submit"
                className="w-full flex justify-center bg-green-600 text-white py-2 rounded-lg  focus:outline-none"
                disabled={isLoading}
                >
                    {
                        isLoading ? <VscLoading className="animate-spin my-1" /> :"Sign in"
                    }
            </button>
        </form>
    )
}

interface ILoginFormData {
    email: string;
    password: string;
}