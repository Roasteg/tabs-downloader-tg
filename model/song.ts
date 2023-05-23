class Song {
    songId: number;
    artist: string;
    title: string;
    constructor(songId: number, artist: string, title: string) {
        this.songId = songId;
        this.artist = artist;
        this.title = title;
    }
}

export default Song;