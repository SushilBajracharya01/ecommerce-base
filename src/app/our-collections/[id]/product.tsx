import ProductImagesPreview from '@/components/ProductImagesPreview'
import React from 'react'
import { FaHeart } from 'react-icons/fa'

export default function ProductOverviewPage() {
    return (
        <div className="space-y-4">
            <div className='lg:grid lg:grid-cols-2'>
                <ProductImagesPreview />

                <div className='mt-8 sm:mt-16 lg:mt-0'>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Title</h1>

                    <div className="mt-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl text-gray-900">200</p>
                    </div>

                    <div className="mt-6">
                        <h3 className="sr-only">Description</h3>

                        <div
                            className="text-base text-gray-700 space-y-6"
                            dangerouslySetInnerHTML={{ __html: 'lorem' }}
                        />

                        <div className="mt-10 flex sm:flex-col1">
                            <button
                                type="submit"
                                className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                            >
                                Add to bag
                            </button>

                            <button
                                type="button"
                                className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                            >
                                <FaHeart className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                <span className="sr-only">Add to favorites</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}