import { ShoppingCart, getCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import { removeProductFromCart, updateProductQuantity } from "./action";
import ProductQuantityChanger from "@/components/ProductQuantityChanger";
import RemoveProductFromCartBtn from "@/components/RemoveProductFromCartBtn";
import Link from "next/link";

export default async function Cart() {
    const cart: ShoppingCart | null = await getCart();

    return (
        <div className="pt-12">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

            <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                <section aria-labelledby="cart-heading" className="lg:col-span-7">
                    <h2 id="cart-heading" className="sr-only">
                        Items in your shopping cart
                    </h2>

                    <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                        {cart?.items?.map((cartItem, productIdx) => {
                            const { id, product, quantity } = cartItem;
                            return (
                                <li key={id} className="flex py-6 sm:py-10">
                                    <div className="flex-shrink-0">
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            width={150}
                                            height={150}
                                            className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                                        />
                                    </div>

                                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div className="space-y-2 sm:space-y-1">
                                                <div className="flex justify-between">
                                                    <h3 className="text-md font-medium">
                                                        <Link href={`/our-collections/${product.collectionId}/${product.id}`} className="font-medium text-gray-800 hover:text-gray-800">
                                                            {product.name}
                                                        </Link>
                                                    </h3>
                                                </div>
                                                <p className="mt-1 text-sm font-medium text-gray-600">
                                                    Price:  {formatPrice(product.price)}
                                                </p>
                                                <p className="mt-1 text-sm font-medium text-gray-600">
                                                    Total:  {formatPrice(product.price * quantity)}
                                                </p>
                                            </div>

                                            <div className="sm:pr-9 mt-4 sm:mt-0">
                                                <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                                                    Quantity, {product.name}
                                                </label>

                                                <span className="mr-2">
                                                    Quantity:
                                                </span>

                                                <ProductQuantityChanger
                                                    maxQuantity={product.quantity}
                                                    quantity={quantity}
                                                    productId={product.id}
                                                    updateProductQuantity={updateProductQuantity}
                                                />

                                                <RemoveProductFromCartBtn
                                                    productId={product.id}
                                                    removeProductFromCart={removeProductFromCart}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </section>

                {/* Order summary */}
                <section
                    aria-labelledby="summary-heading"
                    className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 sticky top-0"
                >
                    <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                        Order summary
                    </h2>

                    <dl className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <dt className="text-sm text-gray-600">Subtotal</dt>
                            <dd className="text-sm font-medium text-gray-900">
                                {formatPrice(cart?.subTotal || 0)}
                            </dd>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="flex items-center text-sm text-gray-600">
                                <span>Discount</span>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="text-base font-medium text-gray-900">Order total</dt>
                            <dd className="text-base font-medium text-gray-900">{formatPrice(cart?.subTotal || 0)}</dd>
                        </div>
                    </dl>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-primary border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-primaryLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary"
                        >
                            Checkout
                        </button>
                    </div>
                </section>
            </form>

            {/* Related products */}
            {/* <section aria-labelledby="related-heading" className="mt-24">
                <h2 id="related-heading" className="text-lg font-medium text-gray-900">
                    You may also like&hellip;
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {relatedProducts.map((relatedProduct) => (
                        <div key={relatedProduct.id} className="group relative">
                            <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                <img
                                    src={relatedProduct.imageSrc}
                                    alt={relatedProduct.imageAlt}
                                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={relatedProduct.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {relatedProduct.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{relatedProduct.color}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{relatedProduct.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section> */}
        </div>
    )
}