import { prisma } from "@/lib/db/prisma"
import Image from "next/image";
import Link from "next/link";

async function getCollections() {
    const results = await prisma.collections.findMany({
        take: 5
    });
    return results;
}

export default async function ShopByCollections() {
    const collections = await getCollections();
    return (
        <section aria-labelledby="collections-heading" className="pt-24 pb-24 sm:pt-32">
            <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
                <h2 id="collections-heading" className="text-2xl font-extrabold tracking-tight text-gray-900">
                    Shop by Collections
                </h2>
                <a href="/our-collections" className="hidden text-sm font-semibold text-primary hover:text-primaryLight sm:block">
                    Browse all collections<span aria-hidden="true"> &rarr;</span>
                </a>
            </div>

            <div className="mt-4 flow-root">
                <div className="-my-2">
                    <div className="box-content py-2 relative h-80 overflow-x-auto xl:overflow-visible">
                        <div className="absolute min-w-screen-xl px-4 flex space-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-5 xl:gap-x-8">
                            {collections.map((collection) => (
                                <Link
                                    key={collection.id}
                                    href={`/our-collections/${collection.id}`}
                                    className="relative w-56 h-80 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto"
                                >
                                    <span aria-hidden="true" className="absolute inset-0">
                                        <Image
                                            src={collection.coverImage}
                                            alt=""
                                            className="w-full h-full object-center object-cover"
                                            width={224}
                                            height={320}
                                        />
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                                    />
                                    <span className="relative mt-auto text-center text-xl font-bold text-white">{collection.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 px-4 sm:hidden">
                <Link href={`/our-collections`} className="block text-sm font-semibold text-primary hover:text-primaryLight">
                    Browse all collections<span aria-hidden="true"> &rarr;</span>
                </Link>
            </div>
        </section>
    )
}