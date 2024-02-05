import Heart from "../heart";
import css from "./index.module.css";

export default function FloatingHearts() {
    function RandomHeart() {
        const randomSize = Math.random() * 50 + 50; // between 50 and 100
        const left = Math.random() * 100 + "%";
        const top = Math.random() * 100 + "%";
        const randomWobbleLength = Math.floor(Math.random() * 10 + 5) / 10 + "s"; // between 0.5 and 1.5

        return (
            <Heart
                width={randomSize}
                height={randomSize}
                style={{
                    position: "absolute",
                    top,
                    left,
                    animation: `${css.wobbly} ${randomWobbleLength} ease-in-out infinite`,
                }}
            />
        );
    }

    return (
        <div className={css.container}>
            {Array.from({ length: 5 }).map((_, i) => (
                <RandomHeart key={i} />
            ))}
        </div>
    );
}
