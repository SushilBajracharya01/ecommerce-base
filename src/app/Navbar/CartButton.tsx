"use client"

import { ShoppingCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function CartButton({ cart }: ICartButtonProps) {
    const pathname = usePathname();

    return (
        <div className="ml-4 flow-root lg:ml-6 z-10">
            <Menu as={"div"} className="relative inline-block">
                <Menu.Button className={
                    classNames(
                        pathname === "/cart" ? "bg-primary" : "",
                        "relative rounded-full p-2"
                    )
                } >
                    <FaShoppingCart
                        className={classNames(
                            pathname === "/cart" ? "text-gray-50 group-hover:bg-primaryLight" : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                    />

                    <span className="opacity-70 absolute top-5 inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                        {cart?.size || 0}
                    </span>
                    <span className="sr-only">items in cart, view cart</span>
                </Menu.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                <div className="group flex w-full items-center rounded-md px-2 py-2 text-sm">
                                    {cart?.size || 0} Items
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                <div className="group flex w-full items-center rounded-md px-2 py-2 text-sm">
                                    Subtotal: {formatPrice(cart?.subTotal || 0)}
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                {({ close }) => (
                                    <div className="group flex w-full items-center rounded-md px-2 py-2 text-sm">

                                        <Link
                                            href="/cart"
                                            onClick={close}
                                            className="px-4 py-2 text-center w-full font-medium rounded-md shadow-sm text-white bg-primary block"
                                        >
                                            View cart
                                        </Link>
                                    </div>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

interface ICartButtonProps {
    cart: ShoppingCart | null;
}