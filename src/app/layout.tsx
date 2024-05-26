import "@/styles/global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Downloader",
  description: "Download videos from YouTube and other platforms",
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
