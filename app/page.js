"use client";

import { pushHeartNotification, sendHeart } from "@/actions/heart";
import { getBeamsClient, pusherClient } from "@/pusher";
import { useEffect, useRef, useState } from "react";
import FloatingHearts from "./components/FloatingHearts";
import Heart from "./components/Heart";
import css from "./page.module.css";

export default function Home() {
    const [runAnim, setRunAnim] = useState(false);
    const [loading, setLoading] = useState(false);
    const beamsClientRef = useRef(null);

    // Prompt for notification permissions
    useEffect(() => {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") navigator.serviceWorker.ready.then(registerBeams);
        });
    }, []);

    useEffect(() => {
        pusherClient.subscribe("palm");

        pusherClient.bind("heart", () => {
            setRunAnim(true);
            setTimeout(() => setRunAnim(false), 1500);
        });

        return () => {
            pusherClient.unbind("heart");
            pusherClient.unsubscribe("palm");
        };
    }, []);

    async function registerBeams(registration) {
        if (beamsClientRef.current) return;

        const beamsClient = getBeamsClient(registration);

        beamsClientRef.current = beamsClient;

        try {
            await beamsClient.start();

            console.log("Successfully registered with Beams. Device ID:", await beamsClient.getDeviceId());

            await beamsClient.addDeviceInterest("palm");

            console.log("Current interests:", await beamsClient.getDeviceInterests());
        } catch (e) {
            console.error(e);
        }
    }

    async function handleClick() {
        if (runAnim || loading) return;

        setLoading(true);
        await handleSendHeart(location.origin);
        setLoading(false);
    }

    async function handleSendHeart(deep_link) {
        // hacky way to avoid receiving the heart notification that you sent
        await beamsClientRef.current?.removeDeviceInterest("palm");
        await pushHeartNotification(deep_link);
        await beamsClientRef.current?.addDeviceInterest("palm");

        await sendHeart();
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
