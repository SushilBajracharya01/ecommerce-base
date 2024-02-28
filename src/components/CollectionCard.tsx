import { ICollection } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function CollectionCard({
    collection,

}: ICollectionCardProps) {
    return (
        <Link href={`/our-collections/${collection.id}`} className="group block">
            <div
                aria-hidden="true"
                className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden group-hover:opacity-75 lg:aspect-w-5 lg:aspect-h-6"
            >
                <Image
                    src={collection.coverImage}
                    alt={collection.name}
                    className="w-full h-full object-center object-cover"
                    width={500}
                    height={700}
                />
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">{collection.name}</h3>
            <p className="mt-2 text-sm text-gray-500">{collection.description}</p>
        </Link>
    )
}

interface ICollectionCardProps {
    collection: ICollection;
}