"use client"

import { Tab } from "@headlessui/react"
import classNames from "classnames"
import Image from "next/image"

export default function ProductImagesPreview({ images }: IProductImagesPreviewProps) {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <Tab
              key={image}
              className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
            >
              {({ selected }) => (
                <>sad
                  <span className="absolute inset-0 rounded-md overflow-hidden">
                    <Image
                      src={image}
                      alt=""
                      className="w-full h-full object-center object-cover"
                      width={200}
                      height={200}
                    />
                  </span>
                  <span
                            className={classNames(
                              selected ? 'ring-indigo-500' : 'ring-transparent',
                              'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                            )}
                            aria-hidden="true"
                          />
                </>
              )}
            </Tab>
          ))}
        </Tab.List>
      </div>

      <Tab.Panels className="w-full aspect-square">
        {images.map((image) => (
          <Tab.Panel key={image}>
            <Image
              src={image}
              alt={image}
              className="w-full h-full object-center object-cover sm:rounded-lg"
              width={500}
              height={600}
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

interface IProductImagesPreviewProps {
  images: string[]
}