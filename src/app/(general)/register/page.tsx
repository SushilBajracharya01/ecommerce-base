import SignInWithGoogle from "@/components/SignInWithGoogle";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

import Logo from "@/components/Logo";
import Image from "next/image";
import RegisterForm from "@/components/RegisterForm";
import { registerUser } from "@/lib/db/auth";

import GirlBgImg from '@/assets/girl.jpeg';
import Link from "next/link";

async function handleLogin(formData: FormData) {
    "use server";
    signIn('email', { email: formData.get('email'), callbackUrl: '/' })
}

export default async function page() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/");
    }

    const handleRegisterUser = async (userData: IUserData) => {
        "use server"
        const { name, email, password } = userData;
        const response = await registerUser({
            name,
            email,
            password
        });
    }

    return (
        <div className="flex h-dvh">
            <div className="flex flex-col py-14 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 flex-1 max-w-lg lg:max-w-none mx-auto">
                <div className="w-full lg:min-w-80">
                    <div>
                        <Logo
                            imgClassName="h-20"
                            alwaysShowName
                            className="text-3xl gap-4 !justify-start mb-8"
                        />
                    </div>

                    <h2 className="my-6 text-3xl font-extrabold text-gray-800">Register</h2>

                    <RegisterForm
                        handleRegisterUser={handleRegisterUser}
                    />

                    <div className="mt-6 text-xs text-gray-400">
                        Already a member? <Link href={"/login"} className="text-primary font-medium italic">Click here to Login</Link>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block relative w-0 flex-1">
                <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src={GirlBgImg}
                    alt=""
                    width={500}
                    height={800}
                />
            </div>
        </div>
    )
}

export interface IUserData {
    name: string
    email: string
    password: string
}