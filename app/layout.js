import "./globals.css";

export const metadata = {
    manifest: "/manifest.json",
    title: "lov",
    description: "ziomkitrucks",
};

export const viewport = {
    themeColor: "#FFFFFF",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
