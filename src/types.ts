export interface IProduct {
    id: string
    name: string
    description: string
    price: number
    quantity: number
    collectionId: string;
    images: string[]
}

export type InputTypes = "email" | "text" | "number" | "file" | "password";

export interface ICollection {
    id: string;
    name: string
    description: string
    coverImage: string
}


export interface IOptions {
    value: string;
    label: string;
}