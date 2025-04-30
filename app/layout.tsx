import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import { siteConfig } from "@/constants/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={``}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
