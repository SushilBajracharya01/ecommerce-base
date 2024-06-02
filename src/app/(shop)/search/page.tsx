import NextBreadcrumb from "@/components/BreadCrumb";
import CategoryFilterInSearch from "@/components/CategoryFilterInSearch";
import EmptyContent from "@/components/EmptyContent";
import FullDetailCard from "@/components/FullDetailCard"
import PaginationBar from "@/components/PaginationBar";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export function generateMetadata({ searchParams: { query } }: ISearchPageProps): Metadata {
  return {
    title: `Search: ${query ?? ""} - LionHearts`
  }
}

async function getFilteredProductsWithCount({ query, filter_collections, pageSize, currentPage }: IProductFilters) {
  if (filter_collections) {
    return await prisma.$transaction([
      prisma.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive'
              },
              collectionId: {
                in: filter_collections.split(',')
              }
            },
            {
              description: {
                contains: query,
                mode: 'insensitive'
              },
              collectionId: {
                in: filter_collections.split(',')
              }
            }
          ]
        },
        orderBy: { id: 'desc' },
        take: pageSize,
        skip: (currentPage - 1) * pageSize,
      }),
      prisma.product.count({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive'
              },
              collectionId: {
                in: filter_collections.split(',')
              }
            },
            {
              description: {
                contains: query,
                mode: 'insensitive'
              },
              collectionId: {
                in: filter_collections.split(',')
              }
            }
          ]
        }
      })
    ])
  }

  return await prisma.$transaction([
    prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      },
      orderBy: { id: 'desc' },
      take: pageSize,
      skip: (currentPage - 1) * pageSize,
    }),
    prisma.product.count({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      }
    })
  ])
}

export default async function SearchPage({ searchParams: { query, filter_collections, page = '1' } }: ISearchPageProps) {
  const pageSize = 6;
  const currentPage = parseInt(page);

  const collections = await prisma.collections.findMany({});

  const [products, totalItemCount] = await getFilteredProductsWithCount({
    query,
    filter_collections,
    pageSize,
    currentPage
  });

  const totalPages = Math.ceil(totalItemCount / pageSize);

  return (
    <div className="space-y-4 pt-12">
      <NextBreadcrumb
        breadcrumbs={[
          {
            label: "Home",
            path: "/"
          },
          {
            label: "Search",
            path: "/search"
          }
        ]}
      />
      <div className="border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Search {query ? <>results for <span className="text-primary">{query}</span></> : null}</h1>
      </div>

      <div className="pt-8 pb-8 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <aside>
          <CategoryFilterInSearch
            page={page}
            query={query}
            queryCollections={filter_collections}
            collections={collections}
          />
        </aside>


        <section className="mt-6 lg:mt-0 col-span-1 lg:col-span-2 xl:col-span-3">
          {
            products.length === 0 ?
              <EmptyContent
                title={`Products with "${query}"`}
              />
              :
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                {products.map(product => {
                  return (
                    <FullDetailCard
                      key={product.id}
                      product={product}
                    />
                  )
                })
                }
              </div>
          }
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </section>
      </div>
    </div>
  )
}

interface ISearchPageProps {
  searchParams: {
    query: string;
    filter_collections: string;
    page: string;
  }
}
interface IProductFilters {
  query: string,
  filter_collections: string;
  pageSize: number,
  currentPage: number
}