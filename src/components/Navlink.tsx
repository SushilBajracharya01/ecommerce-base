"use client"

import classNames from "classnames";
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navlink({ link, className }: INavLinkProps) {
    const pathname = usePathname();
    return (
        <Link
            key={link.label}
            href={link.href}
            className={classNames(
                className,
                "ml-8 h-full flex items-center text-sm font-medium text-gray-700 hover:text-gray-800",
                pathname == link.href && "border-b-2 border-primary text-bold text-primary hover:text-primary"
            )}
        >
            {link.label}
        </Link>
    )
}

interface INavLinkProps {
    link: {
        label: string
        href: string
    },
    className?: string
}