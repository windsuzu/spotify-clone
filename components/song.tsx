import Image from "next/image";
import React, { useContext } from "react";
import useSpotify from "../hooks/useSpotify";
import { fetchImg } from "../lib/fetch-img";
import { millisToMinutesAndSeconds } from "../lib/time";
import { useAppDispatch } from "../store";
import { ModalContext } from "../store/modal-context";
import { trackActions } from "../store/track-slice";

type Props = {
    track: SpotifyApi.PlaylistTrackObject;
    order: number;
};

const Song = ({ track, order }: Props) => {
    const spotifyApi = useSpotify();
    const dispatch = useAppDispatch();
    const modalContext = useContext(ModalContext);

    const playSong = () => {
        dispatch(trackActions.setCurrentTrackId(track.track.id));
        dispatch(trackActions.setIsPlaying(true));
        spotifyApi
            .play({
                uris: [track.track.uri],
            })
            .catch((err) => {
                let msg = "";
                if (err.message.includes("NO_ACTIVE_DEVICE")) {
                    msg =
                        "You should connect a device (Spotify-Web-Player or Desktop-Player) to play your songs!";
                } else {
                    msg =
                        "You need to be a premium member of Spotify to play your songs here!";
                }
                modalContext.showModal("Something Went Wrong!", msg, "OK");
            });
    };

    return (
        <div
            className="grid grid-cols-2 text-gray-500 px-2 py-2 hover:bg-gray-900 transition duration-150 ease-out rounded-lg cursor-pointer"
            onClick={playSong}
        >
            <div className="flex items-center space-x-4">
                <p>{order + 1}</p>
                <div className="relative min-w-[40px] min-h-[40px]">
                    <Image
                        src={fetchImg(track.track.album.images[0].url)}
                        alt={track.track.album.name}
                        layout="fill"
                    />
                </div>
                <div>
                    <p className="w-36 lg:w-64 text-white truncate">
                        {track.track.name}
                    </p>
                    <p className="w-40">{track.track.artists[0].name}</p>
                </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="w-40 hidden md:inline">
                    {track.track.album.name}
                </p>
                <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    );
};

export default Song;
