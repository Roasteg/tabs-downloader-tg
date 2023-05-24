import axios from "axios";
import { unlinkSync, writeFile } from "fs";
import { Context, NarrowedContext } from "telegraf";
import { Message, Update } from "telegraf/typings/core/types/typegram";

export default async function downloadTab(
    context: NarrowedContext<
        Context<Update> & {
            match: RegExpExecArray;
        },
        {
            message: Update.New & Update.NonChannel & Message.TextMessage;
            update_id: number;
        }
    >,
    tabId: string
) {
    const revisions = await axios.get<{ source: string; title: string }[]>(
        `https://www.songsterr.com/api/meta/${tabId}/revisions`
    );
    const response = await axios.get(revisions.data[0].source, {
        responseType: "arraybuffer",
        headers: {
            "Content-Type": "application/guitar-pro5",
        },
    });
    const buffer = Buffer.from(response.data);

    await writeFile(revisions.data[0].title + ".gp5", buffer, () => {});
    await context.replyWithDocument({
        source: revisions.data[0].title + ".gp5",
    });
    await unlinkSync(revisions.data[0].title + ".gp5");
}
