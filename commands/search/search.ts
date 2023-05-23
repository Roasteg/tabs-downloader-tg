import axios from "axios";
import { Composer } from "telegraf";
import Song from "../../model/song";
import editMessage from "../../helper/editMessage";
import getSongsStrings from "../../helper/getSongsString";

export default async function search(query: string, from: number): Promise<Song[]> {
        const response = await axios.get(
            `https://www.songsterr.com/api/songs?size=5&from=${from}&pattern=${query}`
        );
        
        return response.data.map((song: Song) => new Song( song.songId, song.artist, song.title));
}

module.exports = Composer.command("search", async (context) => {
    const fromSize = 0;

    const searchQuery: string = context.message.text
        .split("/search ")
        .join(" ");
    const { message_id } = await context.reply("Searching...", {reply_markup: {inline_keyboard: []}});

    try {
        const songs = await search(searchQuery, fromSize);

        if(songs.length > 0) {
            await editMessage(context, message_id, `Found!\n${getSongsStrings(songs)}`, {
                inline_keyboard: [
                    [
                        {
                            text: "Previous",
                            callback_data: "previous"
                        },
                        {
                            text: "Next",
                            callback_data: "next"
                        }
                    ]
                ]
            });
        } else {
            await editMessage(context, message_id, "Not found!")
        }
    }
    catch (error){
        context.reply(String(error));
    }
    
});
