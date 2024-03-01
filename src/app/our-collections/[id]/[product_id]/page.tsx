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
import Image from 'next/image';
import Link from 'next/link';

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

async function getCollectionProducts(collection?: string) {
    if (!collection) return [];
    const res = await prisma.product.findMany({
        where: {
            collectionId: collection
        },
        take: 4
    })
    return res;

}

export default async function ProductOverviewPage({ params }: IProductOverviewPageProps) {
    const { product_id } = params;
    const product = await getProductDetail(product_id);
    const productInCart = await getProductFromCart(product_id);
    const relatedProducts = await getCollectionProducts(product?.collectionId);

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
                        label: "Our Collections",
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
                        </div>
                    </div>
                </div>
            </div>

            {/* Related products */}
            <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0">
                <h2 id="related-heading" className="text-xl font-bold text-gray-900">
                    Related products
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {relatedProducts.map((product) => (
                        <div key={product.id}>
                            <Link className="relative hover:opacity-75 " key={product.id} href={`/our-collections/${product.collectionId}/${product.id}`}>
                                <div className="relative w-full h-72 rounded-lg overflow-hidden">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-center object-cover"
                                    />
                                </div>
                                <div className="relative mt-4">
                                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                    <p className="line-clamp-2 mt-1 text-sm text-gray-500">{product.description}</p>
                                </div>
                                <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                    />
                                    <p className="relative text-lg font-semibold text-white">{formatPrice(product.price)}</p>
                                </div>
                            </Link>
                            <div className="mt-6">
                                <AddToCartBtn
                                    productId={product.id}
                                    incrementProductQuantity={incrementProductQuantity}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div >
    )
}

interface IProductOverviewPageProps {
    params: {
        id: string
        product_id: string
    }
}