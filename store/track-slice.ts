import { createSlice } from "@reduxjs/toolkit";

interface TrackState {
    currentTrackId: string | null;
    isPlaying: boolean;
}

const initialState: TrackState = {
    currentTrackId: null,
    isPlaying: false,
};

const trackSlice = createSlice({
    name: "track",
    initialState,
    reducers: {
        setCurrentTrackId: (state, action) => {
            return { ...state, currentTrackId: action.payload };
        },
        setIsPlaying: (state, action) => {
            return { ...state, isPlaying: action.payload };
        },
    },
});

export default trackSlice;
export const trackActions = trackSlice.actions;
