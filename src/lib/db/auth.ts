import { prisma } from "./prisma";
import bcrypt from 'bcrypt';

export async function registerUser (userData: IUserData) {
    const {name, email, password} = userData;

    if(!name || !email || !password) return null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    })

    return response;
}


interface IUserData {
    name: string;
    email: string;
    password: string;
}