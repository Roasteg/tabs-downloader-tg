import Song from "../model/song";

export default function getSongsString(arrayOfSongs: Song[]): string {
    return arrayOfSongs
        .map(
            (song) =>
                `${song.artist} - ${
                    song.title
                } \nDownload /download${song.songId}\n`
        )
        .join("\n");
}
