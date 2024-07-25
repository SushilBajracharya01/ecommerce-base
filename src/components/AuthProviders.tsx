"use client"

import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

export default function AuthProviders() {
  return (
    <div>
        <button className="border w-full px-4 py-2 rounded-lg flex justify-evenly shadow-sm hover:bg-slate-100 active:bg-slate-50" onClick={() => signIn('google')}>
            <FcGoogle fontSize={26}/>
            <span className="font-">
            Sign in with Google
            </span>
        </button>
    </div>
  )
}