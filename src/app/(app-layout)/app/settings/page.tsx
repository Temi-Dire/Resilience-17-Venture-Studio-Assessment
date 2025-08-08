import type { Metadata } from "next";

import { SettingsClientPage } from "./_components/cl-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Settings",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function SettingsPage() {
    return (
        <main className="flex min-h-[calc(100vh-5rem)] flex-col">
            {/* <RedirectToSignIn />

            <AuthLoading>
                <FullPageOverlay contentType="loading-spinner" />
            </AuthLoading> */}

            <SettingsClientPage />
        </main>
    );
}
