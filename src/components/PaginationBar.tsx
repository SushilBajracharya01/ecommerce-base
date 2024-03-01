"use client"

import classNames from "classnames";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function PaginationBar({
    currentPage,
    totalPages
}: IPaginationBarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const query = searchParams.get('query');
    const filter_collections = searchParams.get('filter_collections');

    const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
    const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

    const numberedPageItems: JSX.Element[] = [];

    const handlePageClick = (page: number) => {
        let Params = new URLSearchParams();

        if (query) Params.append('query', query);
        if (filter_collections) Params.append('filter_collections', filter_collections);

        router.push(`${pathname}?${Params.toString()}&page=${page}`)
    }

    for (let page = minPage; page <= maxPage; page++) {
        numberedPageItems.push(
            <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={classNames('z-10 rounded-md bg-indigo-50 border-gray-500 text-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium', page === currentPage && 'border-2 border-primaryLight !bg-primary text-white pointer-events-none')}
            >
                {page}
            </button>
        )
    }

    if (numberedPageItems.length === 0) {
        return null;
    }

    return (
        <>
            <nav className="mt-16 relative z-0 rounded-md shadow-sm -space-x-px hidden sm:inline-flex gap-1">
                {numberedPageItems}
            </nav>

            <div className="mt-16 relative z-0 rounded-md shadow-sm -space-x-px inline-flex gap-1 sm:hidden">
                {
                    currentPage > 1 &&
                    <button
                        onClick={() => handlePageClick(currentPage - 1)}
                        className={classNames('z-10 rounded-md bg-indigo-50 border-gray-500 text-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium')}
                    >
                        back
                    </button>
                }

                <button className="z-10 rounded-md bg-indigo-50 border-gray-500 text-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium pointer-events-none">

                    Page {currentPage}
                </button>

                {
                    currentPage < totalPages &&
                    <button
                        onClick={() => handlePageClick(currentPage + 1)}
                        className={classNames('z-10 rounded-md bg-indigo-50 border-gray-500 text-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium')}
                    >
                        Next
                    </button>
                }
            </div>
        </>
    )
}

interface IPaginationBarProps {
    currentPage: number
    totalPages: number
}