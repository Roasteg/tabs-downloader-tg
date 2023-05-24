import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import commandsList from "../commands/commands_list";

require('dotenv').config();

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.TELEGRAM_BOT_API_KEY as string);

bot.start((context) => {
    context.reply(`Hello ${context.message.from.first_name}! This bot can search and download guitar tabs from songsterr! Use /help to get info on how to use this bot!`);
})

bot.help((context) => {
    context.reply(commandsList.map((command) => `/${command.name}\n${command.description}\n\n`).join(""));
})

export default bot;