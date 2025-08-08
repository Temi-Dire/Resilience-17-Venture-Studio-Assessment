"use client";

import BarGraph from "@/client/components/shared/bar-graph";
import { PieChart } from "@/client/components/shared/pie-chart";

export function Transactions() {
    return (
        <section className="min-h-screen">
            <div className="flex flex-col gap-6 lg:flex-row">
                <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow">
                    <p className="mb-4 text-gray-600 text-sm">
                        This graph shows your <span className="font-medium text-gray-800">Transactions</span> from each month till <span className="font-medium text-gray-800">July</span> this year.
                    </p>

                    <div className="h-80 w-full">
                        <BarGraph />
                    </div>
                </div>
                <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow">
                    <p className="mb-4 text-gray-600 text-sm">
                        This pie chart shows your <span className="font-medium text-gray-800">credits and debits as percentages</span> this year.
                    </p>

                    <div className="h-80 w-full">
                        <PieChart />
                    </div>
                </div>
            </div>
        </section>
    );
}
