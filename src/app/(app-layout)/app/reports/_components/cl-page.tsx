"use client";

import BarGraph from "@/client/components/shared/bar-graph";

export function ReportsClientPage() {
    return (
        <section className="min-h-screen">
            <header className="mb-6 flex w-full items-center justify-between bg-white px-8 py-8 shadow-sm">
                <h1 className="font-semibold text-gray-800 text-xl">Reports</h1>
            </header>

            <div className="px-8">
                <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow">
                    <p className="mb-4 text-gray-600 text-sm">
                        This graph shows how much you have spent each month till <span className="font-medium text-gray-800">July</span> this year.
                    </p>

                    <div className="h-80 w-full">
                        <BarGraph />
                    </div>
                </div>
            </div>
        </section>
    );
}
