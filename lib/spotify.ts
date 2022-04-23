import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-email",
    "user-read-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read",
    "user-read-recently-played",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-modify-playback-state",
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
