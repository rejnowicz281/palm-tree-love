"use server";

import { pusherServer } from "@/pusher";
import actionError from "@/utils/actions/actionError";
import actionSuccess from "@/utils/actions/actionSuccess";

export async function sendHeart(sender, channel = "palm") {
    try {
        await pusherServer.trigger(channel, "heart", { sender });

        return actionSuccess("sendHeart", { sender });
    } catch (e) {
        return actionError("sendHeart", { error: e.message });
    }
}
