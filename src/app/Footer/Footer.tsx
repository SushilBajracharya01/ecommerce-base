import Image from "next/image";
import { footerNavigation } from "./_data";
import Logo from '@/assets/logo.png';
import { prisma } from "@/lib/db/prisma";
import Link from "next/link";

async function getCollections() {
    const results = await prisma.collections.findMany({
        take: 5
    });
    return results;
}
export default async function Footer() {
    const collections = await getCollections();
    return (
        <footer aria-labelledby="footer-heading" className="bg-white">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
                        {/* Image section */}
                        <div className="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1">
                            <Image
                                src={Logo}
                                width={40}
                                height={40}
                                alt=""
                                className="h-8 w-auto"
                            />
                        </div>

                        {/* Sitemap sections */}
                        <div className="mt-10 col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6">
                            <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Products</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {collections?.map((collection) => (
                                            <li key={collection.name} className="text-sm">
                                                <Link href={`/our-collections/${collection.id}`} className="text-gray-500 hover:text-primary">
                                                    {collection.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Company</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.company.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-500 hover:text-primary" target={item.href === "#" ? "_self" : "_blank"}>
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Customer Service</h3>
                                <ul role="list" className="mt-6 space-y-6">
                                    {footerNavigation.customerService.map((item) => (
                                        <li key={item.name} className="text-sm">
                                            <a href={item.href} className="text-gray-500 hover:text-primary" target={item.href === "#" ? "_self" : "_blank"}>
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Newsletter section */}
                        <div className="mt-12 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4">
                            <h3 className="text-sm font-medium text-gray-900">Sign up for our newsletter</h3>
                            <p className="mt-6 text-sm text-gray-500">The latest deals and savings, sent to your inbox weekly.</p>
                            <form className="mt-2 flex sm:max-w-md">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primaryLight focus:ring-1 focus:ring-primaryLight"
                                />
                                <div className="ml-4 flex-shrink-0">
                                    <button
                                        type="submit"
                                        className="w-full bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-primaryLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryLight"
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 py-10 text-center">
                    <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Sushil Bajracharya. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}