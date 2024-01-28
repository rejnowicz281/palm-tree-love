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
            <Heart onClick={handleClick} width="800" className={`${css.heart}${runAnim ? ` ${css.anim}` : ""}`} />

            {runAnim && <FloatingHearts />}
        </div>
    );
}
