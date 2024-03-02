import NextBreadcrumb from '@/components/BreadCrumb';
import EmptyContent from '@/components/EmptyContent';
import FullDetailCard from '@/components/FullDetailCard';
import PaginationBar from '@/components/PaginationBar';
import { prisma } from '@/lib/db/prisma';
import { ICollection, IProduct } from '@/types';
import React from 'react'


async function getProductsWithCount({ id, pageSize, currentPage }: IGetProductsWithCount) {
    const res = await prisma.$transaction([
        prisma.product.findMany({
            where: {
                collectionId: id
            },
            take: pageSize,
            orderBy: { id: 'desc' },
            skip: (currentPage - 1) * pageSize,
        }),
        prisma.product.count({
            where: {
                collectionId: id
            },
        })
    ])
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
export default async function CollectionPage({ searchParams: { page = '1' }, params }: ICollectionPageProps) {
    const pageSize = 9;
    const currentPage = parseInt(page);
    const { id } = params;

    const collection: ICollection | null = await getCollections({
        id
    });

    const [products, totalItemCount] = await getProductsWithCount({
        id,
        pageSize,
        currentPage
    })

    const totalPages = Math.ceil(totalItemCount / pageSize);

    return (
        <div className="space-y-4 pt-12">
            <div className="border-b border-gray-200 pb-10">
                <NextBreadcrumb
                    breadcrumbs={[
                        {
                            label: "Home",
                            path: "/"
                        },
                        {
                            label: "our collections",
                            path: "/our-collections"
                        },
                        {
                            label: collection?.name || "",
                            path: `/our-collections/${id}`
                        }
                    ]}
                />
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{collection?.name}</h1>
                <p className="mt-4 text-base text-gray-500">
                    {collection?.description}
                </p>
            </div>

            <div className="pt-12 pb-24">

                {products.length > 0 ?
                    <>
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
                        <PaginationBar
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                    </>

                    :
                    <EmptyContent
                        title="Products"
                    />}
            </div>
        </div>
    )
}


interface ICollectionPageProps {
    searchParams: {
        page: string
    };
    params: {
        id: string;
    }
}

interface IGetProductsWithCount {
    id: string,
    pageSize: number,
    currentPage: number
}

interface IGetCollections {
    id: string
}