import { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import useSpotify from "./useSpotify";

const useTrackInfo = (): [
    SpotifyApi.SingleTrackResponse | null,
    string | null,
    boolean
] => {
    const spotifyApi = useSpotify();
    const isPlaying = useAppSelector((state) => state.track.isPlaying);
    const currentTrackId = useAppSelector(
        (state) => state.track.currentTrackId
    );
    const [trackInfo, setTrackInfo] =
        useState<SpotifyApi.SingleTrackResponse | null>(null);

    useEffect(() => {
        const fetchTrackInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await spotifyApi.getTrack(currentTrackId);
                setTrackInfo(trackInfo.body);
            }
        };
        fetchTrackInfo();
    }, [currentTrackId, spotifyApi]);

    return [trackInfo, currentTrackId, isPlaying];
};

export default useTrackInfo;
