"use client";

import { sendHeart } from "@/actions/heart";
import { pusherClient } from "@/pusher";
import { useEffect, useState } from "react";
import Hearts from "./components/Hearts";
import css from "./page.module.css";

export default function Home() {
    const [runAnim, setRunAnim] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        pusherClient.subscribe("palm");

        pusherClient.bind("heart", () => {
            console.log("heart");
            setRunAnim(true);
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
        await sendHeart();
        setLoading(false);
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
            {runAnim && <Hearts />}
        </div>
    );
}
