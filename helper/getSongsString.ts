import Song from "../model/song";

export default function getSongsStrings(arrayOfSongs: Song[]): string {
    return arrayOfSongs
        .map(
            (song) =>
                `${song.artist} - ${
                    song.title
                } \nDownload /download${song.songId}\n`
        )
        .join("\n");
}
