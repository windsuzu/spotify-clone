import spotifyApi from "../lib/spotify";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { SpotifySession } from "../pages/api/auth/[...nextauth]";

const useSpotify = () => {
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            if (session.error === "RefreshAccessTokenError") signIn();
            else
                spotifyApi.setAccessToken(
                    (session as SpotifySession).accessToken
                );
        }
    }, [session]);

    return spotifyApi;
};

export default useSpotify;
