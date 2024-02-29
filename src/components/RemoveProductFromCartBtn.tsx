"use client"

import { IoCloseSharp } from "react-icons/io5";

export default function RemoveProductFromCartBtn({ productId, removeProductFromCart }: IRemoveProductFromCartBtnProps) {
    const handleRemoveBtnClick = () => {
        removeProductFromCart(productId);
    }

    return (
        <div className="absolute top-0 right-0">
            <button type="button" className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500" onClick={handleRemoveBtnClick}>
                <span className="sr-only">Remove</span>
                <IoCloseSharp className="h-5 w-5" aria-hidden="true" />
            </button>
        </div>
    )
}

interface IRemoveProductFromCartBtnProps {
    productId: string;
    removeProductFromCart: (productId: string) => Promise<void>;
}