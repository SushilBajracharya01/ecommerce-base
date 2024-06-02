import NextBreadcrumb from "@/components/BreadCrumb";
import CollectionCard from "@/components/CollectionCard";
import EmptyContent from "@/components/EmptyContent";
import PaginationBar from "@/components/PaginationBar";
import { prisma } from "@/lib/db/prisma"
import { ICollection } from "@/types";

async function getCollectionsWithCount() {
  const res = await prisma.$transaction([
    prisma.collections.findMany({}),
    prisma.collections.count({})
  ]);
  return res;
}

export default async function OurCollectionsPage({ searchParams: { page = '1' } }) {
  const pageSize = 6;
  const currentPage = parseInt(page);

  const [collections, totalItemCount] = await getCollectionsWithCount();

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
            }
          ]}
        />
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Our Collections</h1>
        <p className="mt-4 text-base text-gray-500">
          Checkout out the latest release of Basic Tees, new and improved with four openings!
        </p>
      </div>

      <div className="pt-12 pb-24">
        {collections.length > 0 ?
          <>
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

            <PaginationBar
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>

          :
          <EmptyContent
            title="Collections"
          />}
      </div>
    </div>
  )
}