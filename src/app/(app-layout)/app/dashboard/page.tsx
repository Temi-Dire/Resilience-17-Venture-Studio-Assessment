import type { Metadata } from "next";

import { DashboardClientPage } from "./_components/cl-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Dashboard",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function DashboardPage() {
    return (
        <main className="flex min-h-[calc(100vh-5rem)] flex-col">
            <DashboardClientPage />
        </main>
    );
}
