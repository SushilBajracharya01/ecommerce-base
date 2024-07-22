import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Logo from "@/components/Logo";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

import LoginBgImg from '@/assets/loginbg.jpeg';

export default async function page() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/");
    }

    return (
        <div className="flex h-dvh">
            <div className="flex flex-col py-14 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 flex-1 max-w-lg lg:max-w-none mx-auto">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <Logo
                            imgClassName="h-20"
                            alwaysShowName
                            className="text-3xl gap-4 !justify-start mb-8"
                        />
                    </div>

                    <h2 className="mt-6 mb-2 text-3xl font-extrabold text-gray-800">Login</h2>
                    <p className="mb-6 text-md text-gray-600 leading-tight">Enter your credentials to access your account.</p>

                    <LoginForm />

                    <div className="mt-6 text-xs text-gray-400">
                        Not registered yet? <Link href={"/register"} className="text-primary font-medium italic">Click here to Register</Link>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block relative w-0 flex-1 overflow-hidden">
                <Image
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    src={LoginBgImg}
                    alt=""
                    width={500}
                    height={800}
                />


                <div className="absolute w-full max-w-[400px] mx-8 text-2xl text-center font-semibold p-4 bg-white text-gray-700 rounded-md top-1/2 left-1/2 -translate-x-1/2">
                    Step into the cool side of fashion with Lionsheart.
                </div>
            </div>
        </div>
    )
}