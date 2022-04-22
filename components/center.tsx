import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchImg } from "../lib/fetch-img";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchPlaylist } from "../store/playlist-action";
import Profile from "./profile";
import Songs from "./songs";

const colors = [
    "from-red-500",
    "from-orange-500",
    "from-yellow-500",
    "from-green-500",
    "from-teal-500",
    "from-blue-500",
    "from-indigo-500",
    "from-pink-500",
];

let fetched = false;
const DEFAULT_PLAYLIST = "37i9dQZF1DXafb0IuPwJyF";

const Center = () => {
    const [color, setColor] = useState("from-black");
    const dispatch = useAppDispatch();
    const playlist = useAppSelector((state) => state.playlist.playlist);

    useEffect(() => {
        if (!fetched) return;

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setColor(randomColor);
    }, [playlist]);

    useEffect(() => {
        if (!fetched) {
            dispatch(fetchPlaylist(DEFAULT_PLAYLIST));
            fetched = true;
        }
    }, [playlist, dispatch]);

    return (
        playlist && (
            <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
                <header className="absolute top-5 right-8">
                    <Profile />
                </header>

                <section
                    className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8`}
                >
                    <div className="relative min-h-[176px] min-w-[176px] shadow-2xl">
                        <Image
                            src={fetchImg(playlist?.images[0].url) ?? ""}
                            alt="Playlist Cover"
                            layout="fill"
                            blurDataURL={
                                fetchImg(playlist?.images[0].url) ?? ""
                            }
                        />
                    </div>
                    <div>
                        <p>PLAYLIST</p>
                        <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
                            {playlist.name}
                        </h1>
                    </div>
                </section>
                <Songs tracks={playlist.tracks} />
            </div>
        )
    );
};

export default Center;
