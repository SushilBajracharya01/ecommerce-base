import { formatPrice } from '@/lib/format'
import { IProduct } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function FullDetailCard({ product }: IFullDetailCardProps) {
    return (
        <Link href={`/our-collections/${product.collectionId}/${product.id}`}>
            <div
                key={product.id}
                className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden "
            >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                    />
                </div>
                <div className="flex-1 p-4 space-y-2 flex flex-col">
                    <h3 className="text-md font-medium text-gray-900">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-6">{product.description}</p>
                    <div className="flex-1 flex flex-col justify-end">
                        <p className="text-base font-medium text-gray-900">{formatPrice(product.price)}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

interface IFullDetailCardProps {
    product: IProduct
}
