"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import ProfilePicPlaceholder from '@/assets/profile-pic-placeholder.png';
import { IoCloseSharp, IoMenu } from "react-icons/io5";
import Navlink from "./Navlink";
import { NAVLINKS } from "@/app/Navbar/_data";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";

export default function MobileNav({ session }: IMobileNavProps) {
    const user = session?.user;
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
            >
                <span className="sr-only">Open menu</span>
                <IoMenu className="h-6 w-6" aria-hidden="true" />
            </button>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                            <div className="px-4 pt-5 pb-2 flex">
                                <button
                                    type="button"
                                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <IoCloseSharp className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>


                            <div className="border-t flex flex-col  border-gray-200 py-6 px-4 space-y-2">
                                {NAVLINKS.map((link) => (
                                    <Navlink
                                        link={link}
                                        key={link.href}
                                        className="!ml-0 !mb-2 pb-2"
                                    />
                                ))}
                            </div>

                            <div className="border-t border-gray-200 py-6 px-4 space-y-4 text-sm">
                                {
                                    user ?
                                        (
                                            <>
                                                <div className="flow-root">
                                                    <div className="flex gap-4 items-center">
                                                        <Image
                                                            src={user.image || ProfilePicPlaceholder}
                                                            alt="Profile picture"
                                                            width={32}
                                                            height={32}
                                                            className="rounded-full w-10 object-cover"
                                                        />
                                                        <span className="text-lg font-medium capitalize">
                                                            {user.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flow-root">
                                                    <button onClick={() => signOut({ callbackUrl: '/' })} className="-m-2 p-2 block font-medium text-gray-700">
                                                        Sign out
                                                    </button>
                                                </div>
                                            </>
                                        )
                                        :
                                        <>
                                            <div className="flow-root">
                                                <button onClick={() => signIn()} className="-m-2 p-2 block font-medium text-gray-700">
                                                    Sign in
                                                </button>
                                            </div>
                                            <div className="flow-root">
                                                <button onClick={() => signIn()} className="-m-2 p-2 block font-medium text-gray-700">
                                                    Create account
                                                </button>
                                            </div>
                                        </>
                                }

                            </div>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>
        </>
    )
}

interface IMobileNavProps {
    session: Session | null;
}