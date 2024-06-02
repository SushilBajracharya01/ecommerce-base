"use client"
import classNames from "classnames";
import Image from "next/image"
import { useEffect, useState } from "react";

export default function StoryCarousel() {
  const [active, setActive] = useState(0);
  const [activeItem, setActiveItem] = useState<ICarouselStoryItem>(data[active]);

  const handleActiveChange = (index: number) => {
    const mod = (data.length + index) % data.length;
    setActive(mod)
  }

  useEffect(() => {
    setActiveItem(data[active]);
  }, [active])

  return (
    <div className="flex relative flex-col min-w-[350px] max-w-[500px] mx-auto">
      <div className="aspect-w-3 aspect-h-2 px-8">
        <h3 className="text-xl font-bold text-primary mb-2 text-center">
          {activeItem.title}
        </h3>
        <Image
          className="h-[370px] object-contain"
          src={activeItem.imageUrl}
          alt="lionhearts todo list"
          width={600}
          height={600}
        />
        <div className="text-sm italic mt-2">
          {activeItem.label}
        </div>
      </div>

      <div className="inline-block mx-auto space-x-4">
        {
          data.map((_, index) => {
            return (
              <button
                key={`${active}-${index}`}
                type="button"
                className={classNames(index === active && "!bg-primary", "bg-gray-400 w-3 h-3 rounded-full")}
                aria-current={index === active ? "true" : "false"}
                aria-label={`Slide ${index}`}
              >
                <span className="sr-only">Slide {index}</span>
              </button>
            )
          })
        }
      </div>

      <button
        onClick={() => handleActiveChange(active - 1)}
        type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        onClick={() => handleActiveChange(active + 1)}
        type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>

  )
}

const data = [
  {
    imageUrl: "https://res.cloudinary.com/duxj2dssw/image/upload/v1709302271/lionhearts_todo_yyelwq.png",
    title: "Lionhearts todo list",
    label: "Todo list created in Excalidraw, woundn't have built it to this state if it was not for this todo list. Always create a todolist.",
  },
  {
    imageUrl: "https://res.cloudinary.com/duxj2dssw/image/upload/v1709302606/Screenshot_2024-03-01_at_8.01.16_PM_weq3l5.png",
    title: "Tailwind UI",
    label: "Tailwind UI is amazing; it greatly helped in building the UI.",
  },
  {
    imageUrl: "https://res.cloudinary.com/duxj2dssw/image/upload/v1709302493/Screenshot_2024-03-01_at_7.59.36_PM_twx2rz.png",
    title: "FreeCodeCamp and Coding in Flow",
    label: "Thanks to FreeCodeCamp and Coding in Flow for making learning easy.",
  },
  {
    imageUrl: "https://res.cloudinary.com/duxj2dssw/image/upload/v1709302399/copilot_rb6ntf.png",
    title: "Copilot Bing",
    label: "Thanks to Copilot Bing for making it easy and possible to generate images using AI!",
  },
  {
    imageUrl: "https://res.cloudinary.com/duxj2dssw/image/upload/v1709309315/ChatGPT_logo.svg_wyvb7m.png",
    title: "ChatGPT",
    label: "Thanks to ChatGPT for helping me generate website content and come up with ideas!"
  },
]

interface ICarouselStoryItem {
  title: string;
  label: string;
  imageUrl: string;
}