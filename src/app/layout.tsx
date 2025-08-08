import "@/client/styles/globals.css";

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/client/components/ui/sonner";
import { ThemeProvider } from "./_components/next-theme";

export const metadata: Metadata = {
    metadataBase: new URL("http://localhost:3000"),
    title: {
        default: "Fintrack",
        template: "%s - Fintrack",
    },
    description: "Track Transactions Effectively. Execute Seamlessly. Powered by Fintrack.",
    openGraph: {
        type: "website",
        images: ["/assets/logo/fintrack-logo.png"],
    },
    twitter: {
        card: "summary_large_image",
        images: ["/assets/logo/fintrack-logo.png"],
    },
    icons: [
        {
            rel: "icon",
            url: "/assets/logo/fintrack-pig-logo.svg",
        },
    ],
};

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased`}>
                <ThemeProvider
                    // breaker
                    enableSystem
                    attribute="class"
                    defaultTheme="light"
                    disableTransitionOnChange
                >
                    <NuqsAdapter>{children}</NuqsAdapter>

                    <Toaster richColors position="top-center" />
                </ThemeProvider>
            </body>
        </html>
    );
}
