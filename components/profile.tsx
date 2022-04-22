import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Profile = () => {
    const { data: session } = useSession();

    if (session?.user?.image)
        return (
            <div className="flex items-center text-white bg-black space-x-3 opacity-90 hover:opacity-80 transition-opacity cursor-pointer rounded-full p-1 pr-2">
                <div className="relative w-10 h-10">
                    <Image
                        src={session?.user?.image}
                        alt="Avatar"
                        layout="fill"
                        className="rounded-full"
                    />
                </div>
                <h2 className="text-base">{session?.user?.name}</h2>
                <ChevronDownIcon className="h-5 w-5" />
            </div>
        );
    else return <></>;
};

export default Profile;
