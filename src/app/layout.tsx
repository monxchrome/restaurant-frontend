"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { Providers } from "@/app/providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    const showSidebar = pathname !== "/login";

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
            {showSidebar && <Sidebar />}
            <main style={{ marginLeft: showSidebar ? 250 : 0 }}>
                {children}
            </main>
        </Providers>
        </body>
        </html>
    );
}
