"use server"

import { registerUser } from "@/lib/db/auth";
import { IUserData } from "../(general)/register/page";

export async function createUser(userData: IUserData) {
    const { name, email, password } = userData;
    const response:any= await registerUser({
        name,
        email,
        password
    }); 
    return response;
}