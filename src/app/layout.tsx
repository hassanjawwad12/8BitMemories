import "./globals.css";

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "8BitMemories — The Haunted Game Museum",
  description:
    "A view-only museum of the retro-gaming world that boots like a haunted OS. " +
    "Browse classic arcade, console, and PC exhibits — each with a live, " +
    "game-specific micro-animation. The games we grew up on.",
  applicationName: "8BitMemories",
  authors: [{ name: "8BitMemories" }],
  keywords: ["retro games", "arcade", "museum", "pixel art", "emulator", "8-bit"],
  openGraph: {
    title: "8BitMemories — The Haunted Game Museum",
    description: "A view-only, haunted-OS museum of the games we grew up on.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1c2333",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla's
          cz-shortcut-listen) inject attributes onto <body> before React
          hydrates; this scopes the warning suppression to those body attrs. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
