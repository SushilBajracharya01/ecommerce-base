import StoryCarousel from "@/components/StoryCarousel";

export default function OurStoryPage() {
    return (
        <div className="pt-12">
            <h1 className="text-5xl font-bold text-gray-800">
                Next.js Journey: React To Next
            </h1>

            <div className="mt-12 flex flex-col lg:flex-row gap-8">
                <div className="text-lg space-y-5 max-w-[700px]">
                    <p>
                        Once, a React developer named Sushil Bajracharya ventured into learning Next.js, drawn to its server-side rendering and seamless React integration. Immersing himself in Next.js&apos;s documentation and tutorials, Sushil quickly grasped its fundamentals and set out to create a dynamic ecommerce website.
                    </p>
                    <p>
                        Employing Next.js&apos;s robust features, Sushil crafted a website that showcased products, managed categories, and facilitated smooth cart interactions. Leveraging Next Auth for secure user authentication and Cloudinary for effortless image uploads, he seamlessly integrated complex functionalities into his site.
                    </p>

                    <p>
                        Impressed by Next.js&apos;s server-side rendering capabilities, Sushil appreciated the website&apos;s speed and SEO-friendliness. He also found Next.js&apos;s built-in support for features like internationalization and API routes invaluable, streamlining the development process.
                    </p>

                    <p>
                        Upon launching the website, Sushil received accolades for its sleek design and seamless functionality, solidifying his belief in Next.js&apos;s potential for creating modern web experiences.
                    </p>
                </div>

                <StoryCarousel />
            </div>
        </div>
    )
}