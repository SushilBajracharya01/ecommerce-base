import Image from 'next/image'
import Link from 'next/link'
import LogoPng from '@/assets/logo.png'

export default function Logo() {
    return (
        <Link href="/" className="text-gray-700 flex gap-1 justify-center items-center">
            <span className="sr-only">Lion Heart</span>
            <Image
                className="h-10 w-auto"
                src={LogoPng}
                alt="LionHearts"
                width={48}
                height={48}
            />
            <span className="font-bold">
                LionHearts
            </span>
        </Link>
    )
}