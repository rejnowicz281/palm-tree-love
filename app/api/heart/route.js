import { pusherServer } from "@/pusher";

export async function POST(req) {
    pusherServer.trigger("palm", "heart", {});

    return new Response(JSON.stringify({ success: true }));
}
