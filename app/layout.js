import "./globals.css";

export const metadata = {
    manifest: "/manifest.json",
    title: "lov",
    description: "ziomkitrucks",
};

export const viewport = {
    themeColor: "#FFFFFF",
    minimumScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
