"use client"

import { Session } from "next-auth"
import ProfilePicPlaceholder from '@/assets/profile-pic-placeholder.png';
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";

export default function AccountOptions({ session }: IAccountOptions) {
    const user = session?.user;

    if (user) {
        return (
            <div className="hidden sm:block z-10">
                <Menu as={"div"} className="relative inline-block">
                    <Menu.Button>
                        <Image
                            src={user.image || ProfilePicPlaceholder}
                            alt="Profile picture"
                            width={32}
                            height={32}
                            className="rounded-full w-10 object-cover"
                        />
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
                                    <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm" onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        )
    }

    return (
        <div className="z-10 hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                Sign in
            </Link>
            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
            <Link href={"/register"} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                Create account
            </Link>
        </div>
    )
}

interface IAccountOptions {
    session: Session | null;
}