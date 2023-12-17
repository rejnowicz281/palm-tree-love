"use server";

import { pusherServer } from "@/pusher";

export async function sendHeart(channel = "palm") {
    try {
        await pusherServer.trigger(channel, "heart", {});

        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
}
