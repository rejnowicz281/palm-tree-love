"use client";

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

    function handleClick() {
        if (runAnim) return;

        setRunAnim(true);
        setTimeout(() => setRunAnim(false), 1500);

        fetch("/api/heart", {
            method: "POST",
        });
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
