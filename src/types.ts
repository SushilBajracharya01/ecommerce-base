export interface IProduct {
    id: string
    name: string
    description: string
    price: number
    quantity: number
}

export type InputTypes = "email" | "text" | "number" | "file"

export interface ICollection {
    id: string;
    name: string
    description: string
    coverImage: string
}
