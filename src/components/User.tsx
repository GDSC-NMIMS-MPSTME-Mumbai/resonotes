import Image from "next/image";
import type { FC } from "react";

const User: FC = () => {
    return (
        <div className="w-full self-start px-8">
            <div className="my-2 flex cursor-pointer items-center gap-5 rounded-sm p-2 hover:bg-gray-300">
                <Image
                    width={50}
                    height={50}
                    className="rounded-full"
                    src="https://unsplash.it/50/50"
                    alt="Your Profile Picture"
                />
                <div className="flex flex-1 flex-col">
                    <span className="text-base font-medium">
                        Parnav Harinathan
                    </span>
                    <span className="text-xs text-gray-700">
                        parnavh@gmail.com
                    </span>
                </div>
                <Image
                    width={18}
                    height={18}
                    src="/icons/right-arrow.svg"
                    alt=""
                    className="justify-self-end"
                />
            </div>
        </div>
    );
};

export default User;
