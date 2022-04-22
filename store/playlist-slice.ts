import { createSlice } from "@reduxjs/toolkit";
import { fetchPlaylist } from "./playlist-action";

interface PlaylistState {
    playlist: SpotifyApi.SinglePlaylistResponse | null;
}

const initPlaylistState: PlaylistState = {
    playlist: null,
};

const playlistSlice = createSlice({
    name: "playlist",
    initialState: initPlaylistState,
    reducers: {},
    extraReducers: {
        [fetchPlaylist.fulfilled.type]: (state, action) => {
            state.playlist = action.payload;
        },
        [fetchPlaylist.rejected.type]: (state, action) => {
            state.playlist = null;
        },
    },
});

export default playlistSlice;
