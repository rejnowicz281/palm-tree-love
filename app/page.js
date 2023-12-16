"use client";

import { pusherClient } from "@/pusher";
import { useEffect } from "react";
import css from "./page.module.css";

export default function Home() {
    useEffect(() => {
        pusherClient.subscribe("palm");

        pusherClient.bind("heart", () => console.log("heart"));

        return () => {
            pusherClient.unbind("heart");
            pusherClient.unsubscribe("palm");
        };
    }, []);

    function handleClick() {
        fetch("/api/heart", {
            method: "POST",
        });
    }

    return (
        <div className={css.wrapper}>
            <div className={css["image-container"]}>
                <img onClick={handleClick} className={css.image} src="/gye.png" alt="Hear it" />
            </div>
        </div>
    );
}
