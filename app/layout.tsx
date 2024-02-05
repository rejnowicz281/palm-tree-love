import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
    manifest: "/manifest.json",
    title: "lov",
    description: "ziomkitrucks",
};

export const viewport: Viewport = {
    themeColor: "#FFFFFF",
    minimumScale: 1,
};

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
