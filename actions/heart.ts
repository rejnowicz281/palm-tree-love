"use server";

import { getBeamsServer, pusherServer } from "@/pusher";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";

export async function sendHeart(socket_id: string | undefined, channel = "palm") {
    try {
        await pusherServer.trigger(channel, "heart", {}, { socket_id });

        return actionSuccess("sendHeart");
    } catch (e: any) {
        return actionError("sendHeart", { error: e.message });
    }
}

export async function pushHeartNotification(deep_link: string | undefined) {
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
    } catch (e: any) {
        return actionError("pushHeartNotification", { error: e.message });
    }
}
