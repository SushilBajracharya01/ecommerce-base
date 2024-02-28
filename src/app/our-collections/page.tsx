import CollectionCard from "@/components/CollectionCard";
import EmptyContent from "@/components/EmptyContent";
import FullDetailCard from "@/components/FullDetailCard"
import { prisma } from "@/lib/db/prisma"
import { ICollection } from "@/types";

async function getCollections() {
  const res = await prisma.collections.findMany({});
  return res
}
export default async function OurCollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200 pb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Our Collections</h1>
        <p className="mt-4 text-base text-gray-500">
          Checkout out the latest release of Basic Tees, new and improved with four openings!
        </p>
      </div>

      <div className="pt-12 pb-24">
        {collections.length > 0 ?
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
            {
              collections.map((collection: ICollection) => {
                return (
                  <CollectionCard
                    key={collection.id}
                    collection={collection}
                  />
                )
              })

            }
          </div>
          :
          <EmptyContent
            title="Collections"
          />}
      </div>
    </div>
  )
}