import { pusherServer } from "@/pusher";

export async function POST() {
    try {
        await pusherServer.trigger("palm", "heart", {});

        return new Response(JSON.stringify({ success: true }));
    } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }));
    }
}
