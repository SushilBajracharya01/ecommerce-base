"use client"

import { redirect, useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react"
import { FaSearch } from "react-icons/fa"



export default function SearchBar({ handleSearchProducts }: ISearchBarProps) {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    const [search, setSearch] = useState(query || "");
    const [openSearch, setOpenSearch] = useState(false);

    useEffect(()=> {
        if (query) {
            setSearch(query);
            setOpenSearch(true);
        }
        else{
            setOpenSearch(false);
            setSearch('');
        }
    },[query]);

    const handleBtnClick = () => setOpenSearch(true);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    const handleOnBlur = () => {
        if (!search) {
            setOpenSearch(false);
        }
    }

    return (
        <div className="flex lg:mr-6">
            {
                openSearch ?
                    <form action={handleSearchProducts} className="p-1 md:p-2 relative" onBlur={handleOnBlur}>
                        <input
                            value={search}
                            onChange={handleSearchChange}
                            name='searchQuery'
                            placeholder='Search'
                            className="border-2 w-full focus:border-primary outline-none border-gray-400 md:py-2 py-1 md:px-4 px-2 rounded-full ring-1-primary"
                        />
                        <FaSearch className="absolute w-4 h-4   text-primary top-3.5 right-3 md:top-5 md:right-5" />
                    </form>

                    :
                    <button onClick={handleBtnClick} className="p-2 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Search</span>
                        <FaSearch className="w-6 h-6" aria-hidden="true" />
                    </button>
            }

        </div>
    )
}

interface ISearchBarProps {
    handleSearchProducts: (formData: FormData) => void
}