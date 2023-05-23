import { Context, NarrowedContext } from "telegraf";
import {
    InlineKeyboardMarkup,
    Message,
    Update,
} from "telegraf/typings/core/types/typegram";

export default async function editMessage(
    context: NarrowedContext<
        Context<Update>,
        {
            message: Update.New & Update.NonChannel & Message.TextMessage;
            update_id: number;
        }
    >,
    messageId: number,
    newText: string,
    replyMarkup?: InlineKeyboardMarkup | undefined
) {
    await context.telegram.editMessageText(
        context.chat.id,
        messageId,
        "",
        newText,
        {
            reply_markup: replyMarkup,
        }
    );
}
