import {
    FastForwardIcon,
    PauseIcon,
    PlayIcon,
    RefreshIcon,
    RewindIcon,
    SwitchHorizontalIcon,
    VolumeOffIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import useTrackInfo from "../hooks/useTrackInfo";
import { fetchImg } from "../lib/fetch-img";
import { useAppDispatch } from "../store";
import { ModalContext } from "../store/modal-context";
import { trackActions } from "../store/track-slice";

let lastVolume = 0;

const Player = () => {
    const spotifyApi = useSpotify();
    const modalContext = useContext(ModalContext);
    const dispatch = useAppDispatch();
    const [trackInfo, currentTrackId, isPlaying] = useTrackInfo();
    const [volume, setVolume] = useState(50);

    const showModal = (
        err: Error,
        title = "Something Went Wrong!",
        button = "OK"
    ) => {
        let msg = "";
        if (err.message.includes("NO_ACTIVE_DEVICE")) {
            msg =
                "You should connect a device (Spotify-Web-Player or Desktop-Player) to play your songs!";
        } else {
            msg =
                "You need to be a premium member of Spotify to play your songs here!";
        }
        modalContext.showModal(title, msg, button);
    };

    const fetchCurrentSong = useCallback(() => {
        spotifyApi.getMyCurrentPlayingTrack().then((data) => {
            if (data.body)
                dispatch(trackActions.setCurrentTrackId(data.body.item?.id));
        });

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body)
                dispatch(trackActions.setIsPlaying(data.body.is_playing));
        });
    }, [dispatch, spotifyApi]);

    useEffect(() => {
        if (!currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackId, fetchCurrentSong]);

    const handlePlayPause = () => {
        if (isPlaying) {
            spotifyApi
                .pause()
                .then(() => {
                    dispatch(trackActions.setIsPlaying(false));
                })
                .catch((err) => {
                    showModal(err);
                });
        } else {
            spotifyApi
                .play()
                .then(() => {
                    dispatch(trackActions.setIsPlaying(true));
                })
                .catch((err) => {
                    showModal(err);
                });
        }
    };

    const volumeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseInt(e.target.value));
    };

    const muteHandler = () => {
        if (currentTrackId) {
            if (volume === 0) {
                spotifyApi
                    .setVolume(lastVolume)
                    .then(() => {
                        setVolume(lastVolume);
                    })
                    .catch((err) => showModal(err));
            } else {
                spotifyApi
                    .setVolume(0)
                    .then(() => {
                        lastVolume = volume;
                        setVolume(0);
                    })
                    .catch((err) => showModal(err));
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentTrackId) {
                spotifyApi.setVolume(volume).catch((err) => {});
            }
        }, 600);
        return () => clearTimeout(timer);
    }, [currentTrackId, spotifyApi, volume]);

    const handleNextSong = () => {
        spotifyApi
            .skipToNext()
            .then(() => {
                fetchCurrentSong();
                dispatch(trackActions.setIsPlaying(true));
            })
            .catch((err) => showModal(err));
    };

    const handlePrevSong = () => {
        spotifyApi
            .skipToPrevious()
            .then(() => {
                fetchCurrentSong();
                dispatch(trackActions.setIsPlaying(true));
            })
            .catch((err) => showModal(err));
    };

    if (trackInfo)
        return (
            <div className="grid grid-cols-3 text-xs md:text-base px-2 md:px-8 w-full">
                {/* Left */}
                <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 relative">
                        <Image
                            src={fetchImg(trackInfo?.album.images[0].url ?? "")}
                            alt="Track Cover"
                            layout="fill"
                        />
                    </div>
                    <div>
                        <h3 className="text-base">{trackInfo.name}</h3>
                        <p className="text-sm text-gray-400">
                            {trackInfo.artists[0].name}
                        </p>
                    </div>
                </div>

                {/* Center Control */}
                <div className="flex items-center justify-evenly">
                    <SwitchHorizontalIcon className="button" />
                    <RewindIcon className="button" onClick={handlePrevSong} />
                    {isPlaying ? (
                        <PauseIcon
                            className="button w-10 h-10"
                            onClick={handlePlayPause}
                        />
                    ) : (
                        <PlayIcon
                            className="button w-10 h-10"
                            onClick={handlePlayPause}
                        />
                    )}
                    <FastForwardIcon
                        className="button"
                        onClick={handleNextSong}
                    />
                    <RefreshIcon className="button" />
                </div>

                {/* Right Volume */}
                <div className="flex items-center justify-end">
                    <VolumeOffIcon className="button" onClick={muteHandler} />
                    <input
                        className="ml-2"
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={volume}
                        onChange={volumeChangeHandler}
                    />
                </div>
            </div>
        );
    return <></>;
};

export default Player;
