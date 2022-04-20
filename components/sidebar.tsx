import SidebarButton from "./sidebar-button";
import {
    HeartIcon,
    HomeIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
    SearchIcon,
} from "@heroicons/react/outline";
import { signOut } from "next-auth/react";

const Sidebar = () => {
    return (
        <div className="text-gray-500 p-5 text-sm border-r border-gray-900">
            <div className="space-y-4">
                <button onClick={() => signOut()}>Sign Out</button>
                <SidebarButton
                    icon={<HomeIcon className="h-5 w-5" />}
                    label="Home"
                />
                <SidebarButton
                    icon={<SearchIcon className="h-5 w-5" />}
                    label="Search"
                />
                <SidebarButton
                    icon={<LibraryIcon className="h-5 w-5" />}
                    label="Library"
                />
                <hr className="border-t-[0.1px] border-gray-900" />
                <SidebarButton
                    icon={<PlusCircleIcon className="h-5 w-5" />}
                    label="Create Playlist"
                />
                <SidebarButton
                    icon={<HeartIcon className="h-5 w-5" />}
                    label="Liked Songs"
                />
                <SidebarButton
                    icon={<RssIcon className="h-5 w-5" />}
                    label="Your Episodes"
                />
                <hr className="border-t-[0.1px] border-gray-900" />
                <p className="cursor-pointer hover:text-white transition duration-200 ease-out">
                    Your playlist...
                </p>
            </div>
        </div>
    );
};

export default Sidebar;
