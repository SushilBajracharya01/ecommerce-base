"use client"

import { useState } from "react";
import Input from "./Input";
import { IUserData } from "@/app/(general)/register/page";

export default function RegisterForm({ handleRegisterUser } : IRegisterFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = () => {
        handleRegisterUser({
            name,
            email,
            password
        })
    }


    return (
        <div>
            <div className="mb-4">
                <Input
                    label="Full Name"
                    name="name"
                    required
                    placeholder="Full Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <Input
                    label="Email address"
                    name="email"
                    required
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <Input
                    label="Password"
                    name="password"
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                type="button"
                className="w-full justify-center bg-green-600 text-white py-2 rounded-lg" onClick={handleFormSubmit}>
                Register
            </button>
        </div>
    )
}

interface IRegisterFormProps {
    handleRegisterUser: (userData: IUserData) => void
}