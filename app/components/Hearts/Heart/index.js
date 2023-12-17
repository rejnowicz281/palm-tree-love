import Image from "next/image";

export default function Heart() {
    const randomSize = Math.random() * 50 + 50;

    return (
        <Image
            src="/gye.png"
            height={randomSize}
            width={randomSize}
            style={{ position: "absolute", top: Math.random() * 100 + "%", left: Math.random() * 100 + "%" }}
        />
    );
}
