import Heart from "../Heart";
import css from "./index.module.css";

export default function FloatingHearts() {
    function RandomHeart() {
        const randomSize = Math.random() * 50 + 50; // between 50 and 100
        const left = Math.random() * 100 + "%";
        const top = Math.random() * 100 + "%";

        return <Heart width={randomSize} height={randomSize} style={{ position: "absolute", top, left }} />;
    }

    return (
        <div className={css.container}>
            {Array.from({ length: 5 }).map((_, i) => (
                <RandomHeart key={i} />
            ))}
        </div>
    );
}
