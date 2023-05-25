import { Composer } from "telegraf";
import downloadTab from "./downloadTab";
import editMessage from "../../helper/editMessage";
module.exports = Composer.hears(/\/download[0-9]|download/, async (context) => {
    const downloadQuery = context.message.text.split("/download").join("");
    if (downloadQuery === "")
        return context.reply(
            "You need to specify id of song to download tab for it!"
        );
    const { message_id } = await context.reply("Attempting download...");
    try {
        await downloadTab(context, downloadQuery);
        await editMessage(context, message_id, "Success!");
    } catch (error) {
        context.reply(String(error));
    }
});
