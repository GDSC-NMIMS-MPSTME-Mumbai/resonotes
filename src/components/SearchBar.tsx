import Image from "next/image";
import type { Dispatch, FC, SetStateAction } from "react";

interface Props {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
}

const SearchBar: FC<Props> = ({ query, setQuery }) => {
    return (
        <div className="my-3 flex w-full overflow-hidden rounded-md outline outline-2 outline-black">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent px-3 py-2 text-xl outline-none placeholder:text-gray-500"
            />
            <div className="bg-black px-4 py-3">
                <Image width={18} height={18} src="/icons/search.svg" alt="" />
            </div>
        </div>
    );
};

export default SearchBar;
