"use client";

import { sendHeart } from "@/actions/heart";
import { pusherClient } from "@/pusher";
import { useEffect, useState } from "react";
import FloatingHearts from "./components/FloatingHearts";
import Heart from "./components/Heart";
import css from "./page.module.css";

export default function Home() {
    const [runAnim, setRunAnim] = useState(false);
    const [loading, setLoading] = useState(false);

    function heartNotification() {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                navigator.serviceWorker.ready.then(function (registration) {
                    registration.showNotification("Heart received", {
                        body: "Someone loves you!",
                        icon: "/icon-512x512.png",
                        image: "/icon-512x512.png",
                        tag: "heart",
                    });
                });
            }
        });
    }

    useEffect(() => {
        pusherClient.subscribe("palm");

        pusherClient.bind("heart", ({ sender }) => {
            console.log("Heart");
            setRunAnim(true);
            // Show notification if not sender
            if (sender !== pusherClient.connection.socket_id) heartNotification();
            setTimeout(() => setRunAnim(false), 1500);
        });

        return () => {
            pusherClient.unbind("heart");
            pusherClient.unsubscribe("palm");
        };
    }, []);

    async function handleClick() {
        if (runAnim || loading) return;

        setLoading(true);
        await sendHeart(pusherClient.connection.socket_id);
        setLoading(false);
    }

    return (
        <div className={css.wrapper}>
            <Heart
                bubbly={true}
                onClick={handleClick}
                width="800"
                className={`${css.heart}${runAnim ? ` ${css.anim}` : ""}`}
            />

            {runAnim && <FloatingHearts />}
        </div>
    );
}
