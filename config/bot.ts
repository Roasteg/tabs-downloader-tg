import { Composer, Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import commands from "../commands/commands_list";
import searchSong from "../commands/search/searchSongs";
import axios from "axios";
import getSongsString from "../helper/getSongsString";

require('dotenv').config();

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.TELEGRAM_BOT_API_KEY as string);

bot.start((context) => {
    context.reply(`Hello ${context.message.from.first_name}! This bot can search and download guitar tabs from songsterr! Use /help to get info on how to use this bot!`);
})



bot.help((context) => {
    commands.map((command) => context.reply(`/${command.name} - ${command.description}`))
})

export default bot;