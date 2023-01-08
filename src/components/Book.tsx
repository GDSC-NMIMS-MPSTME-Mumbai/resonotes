import Image from "next/image";
import type { FC } from "react";

interface Props {
    title: string;
    author: string;
    thumbnail: string;
}

const Book: FC<Props> = ({ title, author, thumbnail }) => {
    return (
        <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 px-9 py-5 hover:cursor-pointer hover:bg-gray-300">
            <Image
                width={95}
                height={120}
                src={thumbnail}
                alt={`${title}'s Thumbnail`}
                className="row-span-2"
            />
            <h3 className="self-end text-2xl font-bold">{title}</h3>
            <span className="text-xl">{author}</span>
        </div>
    );
};

export default Book;
