"use client";

import "@/shared/styles/globals.css";
import { Inter } from "next/font/google";
import "@/shared/styles/antd-overrides.css";
import { AuthProvider } from "@/shared/providers/auth-provider";
import { Providers } from "@/shared/utils/providers/providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} antialiased bg-white`}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
