"use server";

import { getBeamsServer, pusherServer } from "@/pusher";
import actionError from "@/utils/actions/actionError";
import actionSuccess from "@/utils/actions/actionSuccess";

export async function sendHeart(socket_id, channel = "palm") {
    try {
        await pusherServer.trigger(channel, "heart", {}, { socket_id });

        return actionSuccess("sendHeart");
    } catch (e) {
        return actionError("sendHeart", { error: e.message });
    }
}

export async function pushHeartNotification(deep_link) {
    const beamsServer = getBeamsServer();

    try {
        const publishResponse = await beamsServer.publishToInterests(["palm"], {
            web: {
                notification: {
                    title: "Heart Received",
                    body: "Someone loves you!",
                    deep_link,
                },
                data: {
                    lang: "en",
                    tag: "heart",
                },
            },
        });

        return actionSuccess("pushHeartNotification", { publishResponse });
    } catch (e) {
        return actionError("pushHeartNotification", { error: e.message });
    }
}
