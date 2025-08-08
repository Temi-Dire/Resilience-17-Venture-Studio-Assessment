import type { Metadata } from "next";

import { HomeClientPage } from "./_components/cl-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Home",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function HomePage() {
    return (
        <main className="flex min-h-[calc(100vh-5rem)] flex-col bg-green-900">
            <HomeClientPage />
        </main>
    );
}
