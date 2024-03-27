"use client"
import { signIn } from "next-auth/react";
import Input from "./Input";
import { useState } from "react";

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = async () => {
        try {
            const response = await signIn('credentials', { email, password, redirect: false });
            // console.log(response, 'response')
            console.log(response, 'youo')
        }
        catch (error) {
            console.log(error, 'errror')
        }
    }
    return (
        <div>
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
                Sign in
            </button>
        </div>
    )
}