import type { Metadata } from "next";
import { ReportsClientPage } from "./_components/cl-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Reports",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function ReportsPage() {
    return (
        <main className="flex min-h-[calc(100vh-5rem)] flex-col">
            <ReportsClientPage />
        </main>
    );
}
