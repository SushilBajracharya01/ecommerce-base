import { getCsrfToken, signIn } from "next-auth/react";

async function handleLogin(formData: FormData) {
    "use server";
}

export default async function page() {
    return (
        <div>
            <h1>Login</h1>
            <form method="post" action="/api/auth/signin/email">
                <input name="csrfToken" type="hidden" />
                <label>
                    Email address
                    <input type="email" id="email" name="email" />
                </label>
                <button type="submit">Sign in with Email</button>
            </form>

        </div>
    )
}