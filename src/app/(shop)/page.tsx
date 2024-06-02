import ShopByCollections from "@/components/ShopByCollections";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="relative sm:static">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                Explore Your Style with Our Collections
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Discover your unique style with our trendy and timeless fashion staples, from everyday essentials to statement pieces.              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                          <Image
                            src="https://plus.unsplash.com/premium_photo-1693161218308-4906f293840b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="w-full h-full object-center object-cover"
                            width={176}
                            height={256}
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <Image
                            src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="w-full h-full object-center object-cover"
                            width={300}
                            height={256}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <Image
                            src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="w-full h-full object-center object-cover"
                            width={176}
                            height={256}
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <Image
                            src="https://images.unsplash.com/photo-1496360938681-9a918bfabc66?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="w-full h-full object-center object-cover"
                            width={176}
                            height={256}
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <Image
                            src="https://images.unsplash.com/photo-1605268365319-977b4e0f5beb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="w-full h-full object-center object-cover"
                            width={176}
                            height={256}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <Image
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="w-full h-full object-center object-cover"
                            width={306}
                            height={256}
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <Image
                            src="https://images.unsplash.com/photo-1617723843526-5acdabe4cb5a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="w-full h-full object-center object-cover"
                            width={176}
                            height={256}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/our-collections"
                  className="inline-block text-center bg-primary hover:bg-primaryLight border border-transparent rounded-md py-3 px-8 font-medium text-white"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShopByCollections />

      <section aria-labelledby="cause-heading" className="pb-20">
        <div className="relative bg-gray-800 rounded-lg overflow-hidden py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg"
              alt=""
              className="w-full h-full object-center object-cover"
              width={400}
              height={400}
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50" />
          <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
            <h2 id="cause-heading" className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              React to Next.js
            </h2>
            <p className="mt-3 text-xl text-white">
              A powerful combination for building web applications, offering efficient rendering,
              routing, and server-side rendering capabilities. Together, they streamline the development process and enhance the user experience.
            </p>
            <Link
              href="/my-story"
              className="mt-8 w-full block bg-primary border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-primaryLight sm:w-auto"
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
