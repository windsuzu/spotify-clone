import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-read-recently-played",
    "user-read-currently-playing",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-follow-read",
].join(",");

const params = {
    scope: scopes,
};

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${new URLSearchParams(
    params
).toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;
