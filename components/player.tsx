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
import React, { useCallback, useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import useTrackInfo from "../hooks/useTrackInfo";
import { fetchImg } from "../lib/fetch-img";
import { useAppDispatch } from "../store";
import { trackActions } from "../store/track-slice";

let lastVolume = 0;

const Player = () => {
    const spotifyApi = useSpotify();
    const dispatch = useAppDispatch();
    const [trackInfo, currentTrackId, isPlaying] = useTrackInfo();
    const [volume, setVolume] = useState(50);

    const fetchCurrentSong = useCallback(() => {
        if (!trackInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                if (data.body)
                    dispatch(
                        trackActions.setCurrentTrackId(data.body.item?.id)
                    );
            });

            spotifyApi.getMyCurrentPlaybackState().then((data) => {
                if (data.body)
                    dispatch(trackActions.setIsPlaying(data.body.is_playing));
            });
        }
    }, [dispatch, spotifyApi, trackInfo]);

    useEffect(() => {
        if (!currentTrackId) {
            console.log("fetch current song?");
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackId, fetchCurrentSong]);

    const handlePlayPause = () => {
        if (isPlaying) {
            dispatch(trackActions.setIsPlaying(false));
            spotifyApi.pause();
        } else {
            dispatch(trackActions.setIsPlaying(true));
            spotifyApi.play();
        }
    };

    const volumeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseInt(e.target.value));
    };

    const muteHandler = () => {
        if (currentTrackId) {
            if (volume === 0) {
                setVolume(lastVolume);
                spotifyApi.setVolume(lastVolume);
            } else {
                lastVolume = volume;
                setVolume(0);
                spotifyApi.setVolume(0);
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentTrackId) {
                spotifyApi.setVolume(volume);
            }
        }, 600);
        return () => clearTimeout(timer);
    }, [currentTrackId, spotifyApi, volume]);

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
                    <RewindIcon className="button" />
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
                    <FastForwardIcon className="button" />
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
