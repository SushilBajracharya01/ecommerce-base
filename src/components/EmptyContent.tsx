import { TbClothesRack } from "react-icons/tb"

export default function EmptyContent({
    title
}: IEmptyContentProps) {
    return (
        <div className="min-h-80 w-full rounded-md bg-gray-100 grid place-items-center">
            <div className="font-medium text-xl text-gray-500 flex justify-center items-center gap-8 flex-col">
                <TbClothesRack size={100} />

                No {title} Found
            </div>
        </div>
    )
}

interface IEmptyContentProps {
    title: string
}