import FullDetailCard from "@/components/FullDetailCard"
import { prisma } from "@/lib/db/prisma";

async function getProducts() {
  const res = await prisma.product.findMany({});
  return res
}

export default async function SearchPage() {
  const products = await getProducts();
  return (
    <div className="space-y-4 pt-12">
      <div className="border-b border-gray-200 pb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Our Collections</h1>
        <p className="mt-4 text-base text-gray-500">
          Checkout out the latest release of Basic Tees, new and improved with four openings!
        </p>
      </div>

      <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <aside>
        </aside>


        <section className="mt-6 lg:mt-0 col-span-1 lg:col-span-2 xl:col-span-3">
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
            {
              products.map(product => {
                return (
                  <FullDetailCard
                    key={product.id}
                    product={product}
                  />
                )
              })
            }
          </div>
        </section>
      </div>
    </div>
  )
}