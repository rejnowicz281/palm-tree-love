import Heart from "./Heart";
import css from "./index.module.css";

export default function Hearts() {
    return (
        <div className={css.hearts}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Heart key={i} />
            ))}
        </div>
    );
}
