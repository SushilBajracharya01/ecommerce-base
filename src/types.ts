export interface IProduct {
    id: number
    name: string
    description: string
    options: string
    price: string
    imageSrc: string
    imageAlt: string
    href: string
}

export type InputTypes = "email" | "text" | "number"