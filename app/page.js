"use client";

import { sendHeart } from "@/actions/heart";
import { pusherClient } from "@/pusher";
import { useEffect, useState } from "react";
import Hearts from "./components/Hearts";
import css from "./page.module.css";

export default function Home() {
    const [runAnim, setRunAnim] = useState(false);

    useEffect(() => {
        pusherClient.subscribe("palm");

        pusherClient.bind("heart", () => console.log("heart"));

        return () => {
            pusherClient.unbind("heart");
            pusherClient.unsubscribe("palm");
        };
    }, []);

    async function handleClick() {
        if (runAnim) return; // Don't run animation if it's already running or if the request failed

        const res = await sendHeart();

        if (res.success) {
            setRunAnim(true);
            setTimeout(() => setRunAnim(false), 1500);
        }
    }

    return (
        <div className={css.wrapper}>
            <div className={css["image-container"]}>
                <img
                    onClick={handleClick}
                    className={`${css.image}${runAnim ? ` ${css.anim}` : ""}`}
                    src="/gye.png"
                    alt="Heart"
                />
            </div>
            <Hearts runAnim={runAnim} />
        </div>
    );
}
