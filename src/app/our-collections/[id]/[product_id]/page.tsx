import AddToCartBtn from '@/components/AddToCartBtn';
import ProductImagesPreview from '@/components/ProductImagesPreview'
import { prisma } from '@/lib/db/prisma';
import { formatPrice } from '@/lib/format';
import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { getProductFromCart, incrementProductQuantity } from './action';
import ProductQuantityChanger from '@/components/ProductQuantityChanger';
import { updateProductQuantity } from '@/app/cart/action';
import NextBreadcrumb from '@/components/BreadCrumb';

async function getProductDetail(productId: string) {
    const res = await prisma.product.findUnique({
        where: {
            id: productId
        },
        include: {
            collection: true
        }
    })
    return res;
}

export default async function ProductOverviewPage({ params }: IProductOverviewPageProps) {
    const { product_id } = params;
    const product = await getProductDetail(product_id);
    const productInCart = await getProductFromCart(product_id);

    if (!product) return <div></div>;
    return (
        <div className="space-y-4 pt-12">
            <NextBreadcrumb
                breadcrumbs={[
                    {
                        label: "Home",
                        path: "/"
                    },
                    {
                        label: "Collections",
                        path: "/our-collections"
                    },
                    {
                        label: product.collection.name,
                        path: `/our-collections/${product.collectionId}`
                    },
                    {
                        label: product.name,
                        path: `/our-collections/${product.collectionId}/${product.name}`
                    }
                ]}
            />
            <div className='lg:grid gap-4 lg:grid-cols-2 lg:gap-16'>
                <ProductImagesPreview
                    images={product.images}
                />

                <div className='mt-8 sm:mt-16 lg:mt-0'>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

                    <div className="mt-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl text-gray-900">{formatPrice(product.price)}</p>
                    </div >

                    <div className="mt-6">
                        <h3 className="sr-only">Description</h3>

                        <div
                            className="text-base text-gray-700 space-y-6"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />

                        <div className='mt-10 space-x-4'>
                            <span className='text-gray-500'>Quantity:</span>

                            <ProductQuantityChanger
                                productId={product.id}
                                maxQuantity={product.quantity}
                                updateProductQuantity={updateProductQuantity}
                                quantity={productInCart?.quantity || 1}
                            />
                        </div>

                        <div className="mt-10 flex sm:flex-col1">
                            <AddToCartBtn
                                productId={product.id}
                                incrementProductQuantity={incrementProductQuantity}
                            />

                            <button
                                type="button"
                                className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                            >
                                <FaHeart className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                <span className="sr-only">Add to favorites</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

interface IProductOverviewPageProps {
    params: {
        id: string
        product_id: string
    }
}