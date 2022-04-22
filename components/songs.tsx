import React from "react";
import Song from "./song";

type Props = {
    tracks: SpotifyApi.PagingObject<SpotifyApi.PlaylistTrackObject>;
};

const Songs = ({ tracks }: Props) => {
    return (
        <div className="px-8 flex flex-col space-y-1 pb-28">
            {tracks.items.map((track, index) => (
                <Song key={track.track.id} track={track} order={index} />
            ))}
        </div>
    );
};

export default Songs;
