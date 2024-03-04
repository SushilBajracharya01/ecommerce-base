import SignInWithGoogle from "@/components/SignInWithGoogle";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

import Logo from "@/components/Logo";
import Image from "next/image";
import Input from "@/components/Input";
import FormSubmitButton from "@/components/FormSubmitButton";

async function handleLogin(formData: FormData) {
    "use server";
    signIn('email', { email: formData.get('email'), callbackUrl: '/' })
}

export default async function page() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/");
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

                    <h2 className="my-6 text-3xl font-extrabold text-gray-800">Login</h2>

                    <form method="post" action={handleLogin}>
                        <Input
                            label="Email address"
                            name="email"
                            required
                            placeholder="Email"
                        />

                        <FormSubmitButton
                            className="w-full justify-center mt-4 bg-green-600">
                            Sign in with Email
                        </FormSubmitButton>
                    </form>

                    <h3 className="my-4 text-gray-700 text-center">OR</h3>

                    <div>
                        <SignInWithGoogle />
                    </div>
                </div>
            </div>

            <div className="hidden lg:block relative w-0 flex-1">
                <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                    alt=""
                    width={500}
                    height={800}
                />
            </div>
        </div>
    )
}