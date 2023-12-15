import css from "./page.module.css";

export default function Home() {
    return (
        <div className={css.wrapper}>
            <div className={css["image-container"]}>
                <img className={css.image} src="/gye.png" alt="Hear it" />
            </div>
        </div>
    );
}
