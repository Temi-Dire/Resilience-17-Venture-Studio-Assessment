import type { Metadata } from "next";

import { MessagesClientPage } from "./_components/cl-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Messages",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function MessagesPage() {
    return (
        <main className="flex min-h-[calc(100vh-5rem)] flex-col">
            {/* <RedirectToSignIn />

            <AuthLoading>
                <FullPageOverlay contentType="loading-spinner" />
            </AuthLoading> */}

            <MessagesClientPage />
        </main>
    );
}
