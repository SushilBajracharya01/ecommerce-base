"use client"

import { useState, useTransition } from "react";
import { VscLoading } from "react-icons/vsc";

export default function AddToCartBtn({ incrementProductQuantity, productId }: IAddToCartBtnProps) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);

    const handleClick = () => {
        setSuccess(false);
        startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
        })
    }

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleClick}
                className="max-w-xs flex-1 bg-primary border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-primaryLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primaryLight sm:w-full"
            >
                Add to cart
            </button>


            {
                isPending && <VscLoading className="animate-spin mr-2" />
            }

            {
                !isPending && success && <span className="text-green-300">Added to Cart.</span>
            }
        </div>
    )
}

interface IAddToCartBtnProps {
    incrementProductQuantity: (productId: string) => Promise<void>;
    productId: string
}