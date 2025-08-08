import type { Metadata } from "next";
import { TransactionsClientPage } from "./_components/cl-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Transactions",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function TransactionsPage() {
    return (
        <main className="flex min-h-[calc(100vh-5rem)] flex-col">
            <TransactionsClientPage />
        </main>
    );
}
