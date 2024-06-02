"use client"
import { signIn, useSession } from "next-auth/react"
import { useState } from "react"
import { Session } from "next-auth";

import { FaGoogle } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";

export default function SignInWithGoogle() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        setIsLoading(true);
        await signIn('google', { callbackUrl: 'http://localhost:3000/' });
        setIsLoading(false);
    }

    return (
        <button className="flex items-center justify-center w-full rounded-md px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white" onClick={handleSignIn}>
            <span className="mr-2">
                {
                    isLoading ?
                        <VscLoading className="animate-spin" />
                        :
                        <FaGoogle />
                }
            </span>
            Sign In With Google
        </button>
    )
}