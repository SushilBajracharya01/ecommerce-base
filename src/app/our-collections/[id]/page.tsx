import EmptyContent from '@/components/EmptyContent';
import FullDetailCard from '@/components/FullDetailCard';
import { prisma } from '@/lib/db/prisma';
import { ICollection, IProduct } from '@/types';
import React from 'react'

async function getProducts({ id }: IGetProducts) {
    const res = await prisma.product.findMany({
        where: {
            collectionId: id
        }
    })
    return res;
}

async function getCollections({ id }: IGetCollections) {
    const res = await prisma.collections.findUnique({
        where: {
            id
        }
    })
    return res;
}
export default async function CollectionPage({ params }: ICollectionPageProps) {
    const { id } = params;

    const collection: ICollection | null = await getCollections({
        id
    });
    const products: IProduct[] | [] = await getProducts({
        id
    });
    return (
        <div className="space-y-4 pt-12">
            <div className="border-b border-gray-200 pb-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{collection?.name}</h1>
                <p className="mt-4 text-base text-gray-500">
                    {collection?.description}
                </p>
            </div>

            <div className="pt-12 pb-24">
                {products.length > 0 ?
                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                        {
                            products.map((product: IProduct) => {
                                return (
                                    <FullDetailCard
                                        key={product.id}
                                        product={product}
                                    />
                                )
                            })

                        }
                    </div>
                    :
                    <EmptyContent
                        title="Products"
                    />}
            </div>
        </div>
    )
}


interface ICollectionPageProps {
    params: {
        id: string;
    }
}

interface IGetProducts {
    id: string
}

interface IGetCollections {
    id: string
}