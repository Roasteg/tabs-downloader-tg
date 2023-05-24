import { Composer } from "telegraf";

module.exports = Composer.command("source", (context) => {
    context.reply("https://github.com/Roasteg/tabs-downloader-tg");
});
