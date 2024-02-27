import FullDetailCard from "@/components/FullDetailCard"

export default function OurCollectionsPage() {
  return (
    <main className="max-w-2xl lg:max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-4 space-y-4">
      <div className="border-b border-gray-200 pt-12 pb-10">
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
              [{
                id: 1,
                name: 'Product 1',
                description: 'Product 1 description',
                options: 'Product 1 options',
                price: 'Product 1 price',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                imageAlt: 'Front of men&apos;s Basic Tee in black.',
                href: 'our-collections/1',
              },
              {
                id: 2,
                name: 'Product 2',
                description: 'Product 2 description',
                options: 'Product 2 options',
                price: 'Product 2 price',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                imageAlt: 'Front of men&apos;s Basic Tee in black.',
                href: '#',
              },
              {
                id: 3,
                name: 'Product 3',
                description: 'Product 3 description',
                options: 'Product 3 options',
                price: 'Product 3 price',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                imageAlt: 'Front of men&apos;s Basic Tee in black.',
                href: '#',
              }
              ].map(product => {
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
    </main>
  )
}