import { prisma } from "./prisma";
import bcrypt from 'bcrypt';

export async function registerUser (userData: IUserData) {
    const {name, email, password} = userData;

    if(!name || !email || !password) return null;

    const hashedPassword = await bcrypt.hash(password, 10);

    // check for dublicate
    const dublicate = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    if(dublicate) return {message: "User with this email already exists", status: 400, success: false};

    const response = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        },
        select:{
            id: true,
            name: true,
            email: true,
            image: true,
            emailVerified: true
        }
    })

    return {data: response, message: "User info", status: 200, success: true};
}


interface IUserData {
    name: string;
    email: string;
    password: string;
}