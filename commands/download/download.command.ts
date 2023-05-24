import { Composer } from "telegraf";
import downloadTab from "./downloadTab";
import { unlinkSync } from "fs";

module.exports = Composer.hears(/\/download[0-9]|download/, async (context) => {
    const downloadQuery = context.message.text.split("/download").join("");
    if (downloadQuery === "")
        return await context.reply(
            "You need to specify id of tab to download it!"
        );
    try {
        await downloadTab(downloadQuery);
        await context.replyWithDocument({ source: downloadQuery + ".gp5" });
        await unlinkSync(downloadQuery + ".gp5"); 
    } catch (error) {
        context.reply(String(error));
    }
});
