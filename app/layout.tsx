import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { cormorant, outfit } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "ServyGo Admin Portal",
  description: "Operational control center for ServyGo internal teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className={`${outfit.variable} ${cormorant.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-app text-ink antialiased">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
