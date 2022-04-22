import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import Image from "next/image";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const Profile = () => {
    const { data: session } = useSession();

    if (session?.user?.image)
        return (
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="flex items-center text-white bg-[#282828] space-x-3 opacity-90 hover:opacity-80 transition-opacity cursor-pointer rounded-full p-1 pr-2">
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
                </Menu.Button>

                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#282828] text-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={classNames(
                                        active ? "bg-[#313131]" : "",
                                        "block px-1 py-2 m-1 text-sm rounded-sm cursor-pointer"
                                    )}
                                    onClick={() => signOut()}
                                >
                                    <p className="ml-1">Log Out</p>
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Menu>
        );
    else return <></>;
};

export default Profile;
