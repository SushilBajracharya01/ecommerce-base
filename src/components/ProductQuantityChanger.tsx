"use client"

import { useEffect, useState } from "react";

export default function ProductQuantityChanger({ productId, quantity, maxQuantity, updateProductQuantity }: IProductQuantityChangerProps) {
    const [value, setValue] = useState(quantity);

    useEffect(() => {
        setValue(quantity)
    }, [quantity])

    const handleProductQuantityChange = (productId: string, quantity: string) => {
        updateProductQuantity(productId, parseInt(quantity));
    }

    return (
        <select
            id={`quantity-${productId}`}
            name={`quantity-${productId}`}
            value={value}
            onChange={(event) => handleProductQuantityChange(productId, event.target.value)}
            className="max-w-full min-w-[50px] rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primaryLight focus:border-primaryLight sm:text-sm"
        >
            {
                Array.from(Array(maxQuantity).keys()).map((idx) => (
                    <option key={idx} value={idx + 1}>{idx + 1}</option>
                ))
            }
        </select>
    )
}

interface IProductQuantityChangerProps {
    productId: string;
    quantity: number;
    maxQuantity: number;
    updateProductQuantity: (productId: string, quantity: number) => void
}