import SidebarButton from "./sidebar-button";
import {
    HeartIcon,
    HomeIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
    SearchIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { fetchPlaylist } from "../store/playlist-action";
import { useAppDispatch } from "../store";

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const spotifyApi = useSpotify();
    const [playlists, setPlaylists] = useState<
        SpotifyApi.PlaylistObjectSimplified[] | null
    >([]);

    useEffect(() => {
        spotifyApi.getUserPlaylists().then((data) => {
            setPlaylists(data.body.items);
        });
    }, [spotifyApi]);

    const playlistClickHandler = (playlistId: string) => {
        dispatch(fetchPlaylist(playlistId));
    };

    return (
        <div className="text-gray-500 p-5 border-r border-gray-900 h-screen overflow-y-scroll scrollbar-hide text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[14rem] hidden md:inline-block pr-10 pb-32">
            <div className="space-y-4">
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
                {playlists &&
                    playlists.map((playlist) => (
                        <p
                            className="cursor-pointer hover:text-white transition duration-200 ease-out"
                            key={playlist.id}
                            onClick={playlistClickHandler.bind(
                                null,
                                playlist.id
                            )}
                        >
                            {playlist.name}
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default Sidebar;
