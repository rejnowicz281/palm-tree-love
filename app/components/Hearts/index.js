import Heart from "./Heart";
import css from "./index.module.css";

export default function Hearts({ runAnim }) {
    return (
        <div className={`${css.hearts}${runAnim ? ` ${css.anim}` : ""}`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Heart key={i} runAnim={runAnim} />
            ))}
        </div>
    );
}
