"use client";

import { pushHeartNotification, sendHeart } from "@/actions/heart";
import { getBeamsClient, pusherClient } from "@/pusher";
import { useEffect, useRef, useState } from "react";
import FloatingHearts from "./components/FloatingHearts";
import Heart from "./components/Heart";
import css from "./page.module.css";

export default function Home() {
    const loading = useRef(false);
    const beamsClientRef = useRef(null);
    const [floatingHearts, setFloatingHearts] = useState(null);
    const [shake, setShake] = useState(false);
    const [pulsate, setPulsate] = useState(false);

    // Prompt for notification permissions
    useEffect(() => {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") navigator.serviceWorker.ready.then(registerBeams);
        });
    }, []);

    useEffect(() => {
        pusherClient.subscribe("palm");

        pusherClient.bind("heart", () => {
            console.log("Heart received");
            runFloatingHearts();
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

    function runFloatingHearts() {
        if (floatingHearts) return;

        setFloatingHearts(<FloatingHearts />);
        setTimeout(() => setFloatingHearts(null), 1500);
    }

    function runPulsate() {
        if (pulsate) return;

        setPulsate(true);
        setTimeout(() => setPulsate(false), 200);
    }

    function runShake() {
        if (shake) return;

        setShake(true);
        setTimeout(() => setShake(false), 1000);
    }

    async function handleClick() {
        runFloatingHearts();

        if (loading.current || floatingHearts) return;

        loading.current = true;
        await beamsClientRef.current?.removeDeviceInterest("palm");

        const [heartResponse, notificationResponse] = await Promise.all([
            sendHeart(pusherClient.connection.socket_id),
            pushHeartNotification("https://palm-tree-love.vercel.app"),
        ]);

        if (notificationResponse.success) {
            console.log("Sending notification successful");
            runPulsate();
        } else {
            console.log("Sending notification failed");
            runShake();
        }

        if (heartResponse.success) {
            console.log("Sending heart successful");
            runPulsate();
        } else {
            console.log("Sending heart failed");
            runShake();
        }

        await beamsClientRef.current?.addDeviceInterest("palm");

        loading.current = false;
    }

    return (
        <div className={css.wrapper}>
            <Heart
                bubbly={true}
                onClick={handleClick}
                width="800"
                fill="rgb(255, 0, 100)"
                className={`${css.heart}${floatingHearts ? ` ${css.anim}` : ""} ${shake ? ` ${css.shake}` : ""} ${
                    pulsate ? ` ${css.pulsate}` : ""
                }`}
            />

            {floatingHearts}
        </div>
    );
}
