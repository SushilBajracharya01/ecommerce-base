"use client"

import { ICollection } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function CategoryFilterInSearch({ collections, query, page, queryCollections }: ICategoryFilterInSearchProps) {
    const router = useRouter()

    const [selectedCollections, setSelectedCollections] = useState(queryCollections ?? '');

    useEffect(()=>{
        let searchParams = new URLSearchParams();
        if(query) searchParams.append('query', query);
        console.log(selectedCollections, 'selectedCollections')
        if(selectedCollections) searchParams.append('filter_collections', selectedCollections);
        if(page) searchParams.append('page', page);

        router.push('/search?' + searchParams.toString());
    },[page, query, router, selectedCollections])

    const handleSelectClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const collectionId = e.target.value;
        let selectedCollectionsArray = selectedCollections.split(',').filter(Boolean);
        const collectionIdIndex = selectedCollectionsArray.findIndex((id) => id === collectionId);
        console.log(selectedCollectionsArray, 'selectedCollectionsArray')
        if (collectionIdIndex > -1) {
            selectedCollectionsArray.splice(collectionIdIndex, 1)
            if(selectedCollectionsArray.length) {
                setSelectedCollections(selectedCollectionsArray.join(','));
            }
            else {
                setSelectedCollections('');
            }
        } else {
            selectedCollectionsArray.push(collectionId)
            const selectedCollectionIds = selectedCollectionsArray.join(',')
            console.log(selectedCollectionIds,selectedCollectionsArray, 'selectedCollectionIds')
            setSelectedCollections(selectedCollectionIds);
        }
    }

    return (
        <div className="divide-y divide-gray-200 space-y-10">
            <div >
                <fieldset>
                    <legend className="block text-sm font-medium text-gray-900">Collections</legend>
                    <div className="pt-6 space-y-3">
                        {collections.map((collection) => (
                            <div key={collection.id} className="flex items-center">
                                <input
                                    id={`${collection.id}`}
                                    name={`filter_collections`}
                                    value={collection.id}
                                    checked={selectedCollections.includes(collection.id)}
                                    type="checkbox"
                                    onChange={handleSelectClick}
                                    className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primaryLight"
                                />
                                <label htmlFor={`${collection.id}`} className="ml-3 text-sm text-gray-600">
                                    {collection.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

interface ICategoryFilterInSearchProps {
    collections: ICollection[],
    query: string,
    page: string,
    queryCollections: string
}