import { createAsyncThunk } from "@reduxjs/toolkit";
import spotifyApi from "../lib/spotify";

export const fetchPlaylist = createAsyncThunk(
    "playlist/fetchPlaylist",
    async (playlistId: string) => {
        try {
            const res = await spotifyApi.getPlaylist(playlistId);
            return res.body;
        } catch (err) {
            throw new Error("Error fetching playlist");
        }
    }
);
