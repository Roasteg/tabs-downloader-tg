import { Composer, Context, NarrowedContext } from "telegraf";
import editMessage from "../../helper/editMessage";
import getSongsString from "../../helper/getSongsString";
import searchSongs from "./searchSongs";
import bot from "../../config/bot";
import SearchService from "../../service/SearchService";
import { CallbackQuery, Update } from "telegraf/typings/core/types/typegram";

const searchService = new SearchService();

const responseKeyboard = {
    inline_keyboard: [
        [
            {
                text: "Previous",
                callback_data: "previous",
            },
            {
                text: "Next",
                callback_data: "next",
            },
        ],
    ],
};

module.exports = Composer.command("search", async (context) => {
    const searchQuery: string = context.message.text.split("/search").join("");
    const { message_id } = await context.reply("Searching...");

    searchService.searchString = searchQuery;
    searchService.page = 0;

    try {
        const songs = await searchSongs(
            searchService.searchString,
            searchService.page * 5
        );

        if (songs.length > 0) {
            await editMessage(
                context,
                message_id,
                `Found!\n${getSongsString(songs)}`,
                responseKeyboard
            );
        } else {
            await editMessage(context, message_id, "Not found!");
        }
    } catch (error) {
        context.reply(String(error));
    }
});

const switchPage = async (
    context: NarrowedContext<
        Context<Update> & {
            match: RegExpExecArray;
        },
        Update.CallbackQueryUpdate<CallbackQuery>
    >
) => {
    try {
        const songs = await searchSongs(
            searchService.searchString,
            searchService.page * 5
        );
        if (songs.length > 0) {
            await context.editMessageText(`Found!\n${getSongsString(songs)}`, {
                reply_markup: responseKeyboard,
            });
        } else {
            await context.editMessageText("No more tabs", {
                reply_markup: responseKeyboard,
            });
        }
    } catch (error) {
        context.reply(String(error));
    }
};
bot.action("next", async (context) => {
    searchService.page += 1;
    await switchPage(context);
});

bot.action("previous", async (context) => {
    if (searchService.page === 0) return context.answerCbQuery();
    searchService.page -= 1;
    await switchPage(context);
});
