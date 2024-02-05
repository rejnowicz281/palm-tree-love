import PusherBeamsServer from "@pusher/push-notifications-server";
import { Client as PusherBeamsClient } from "@pusher/push-notifications-web";
import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_APP_SECRET!,
    cluster: "eu",
    useTLS: true,
});

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    cluster: "eu",
});

export const getBeamsServer = () =>
    new PusherBeamsServer({
        instanceId: process.env.NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID!,
        secretKey: process.env.PUSHER_BEAMS_SECRET_KEY!,
    });

export const getBeamsClient = (registration: ServiceWorkerRegistration) =>
    new PusherBeamsClient({
        serviceWorkerRegistration: registration,
        instanceId: process.env.NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID!,
    });
