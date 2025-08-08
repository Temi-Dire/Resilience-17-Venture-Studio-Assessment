"use client";

import BarGraph from "@/client/components/shared/bar-graph";

export function MessagesClientPage() {
    return (
        <section className="min-h-screen">
            <header className="mb-6 flex w-full items-center justify-between bg-white px-8 py-8 shadow-sm">
                <h1 className="text-xl font-semibold text-gray-800">Reports</h1>
            </header>

            <div className="px-8">
                <div className="bg-white rounded-xl shadow p-6 w-full max-w-lg">
                    <p className="text-sm text-gray-600 mb-4">
                        This graph shows how much you have spent each month till <span className="font-medium text-gray-800">July</span> this year.
                    </p>

                    <div className="w-full h-80">
                        <BarGraph />
                    </div>
                </div>
            </div>
        </section>
    );
}
