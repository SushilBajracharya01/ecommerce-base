import Image from 'next/image'
import Link from 'next/link'
import LogoPng from '@/assets/logo.png'
import classNames from 'classnames'

export default function Logo({ className, imgClassName, alwaysShowName }: { className?: string, imgClassName?: string, alwaysShowName?: boolean }) {
    return (
        <Link href="/" className={classNames(className, "text-gray-700 flex gap-1 justify-center items-center")}>
            <span className="sr-only">Lion Heart</span>
            <Image
                className={classNames(imgClassName, "h-10 w-auto")}
                src={LogoPng}
                alt="LionHearts"
                width={68}
                height={68}
            />
            <span className={classNames("font-bold", alwaysShowName ? "block" : "hidden sm:block")}>
                LionHearts
            </span>
        </Link>
    )
}