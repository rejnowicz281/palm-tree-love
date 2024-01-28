import { pusherServer } from "@/pusher";

export async function POST(req) {
    try {
        const { sender, channel } = await req.json();
        const data = { sender };

        await pusherServer.trigger(channel || "palm", "heart", data);

        return new Response(JSON.stringify({ success: true, data }));
    } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }));
    }
}
