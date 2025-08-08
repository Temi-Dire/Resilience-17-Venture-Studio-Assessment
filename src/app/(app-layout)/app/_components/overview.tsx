import { TransactionTable } from "@/client/components/shared/transaction-table";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/client/components/ui/card";
import { Skeleton } from "@/client/components/ui/skeleton";
import { formatNumberWithCommas } from "@/client/lib/utils";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";

export function Overview() {

    const [loading, setLoading] = useState(true); // Loader state

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds delay
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <h2 className="mb-6 font-bold text-xl">Overview</h2>
            {/* Summary Cards */}
            <div className="mb-8 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
                {summaryCards.map((card, i) => (
                    <Card key={i} className="w-full bg-[#EAEFF0]">
                        <CardHeader className="flex items-center justify-between gap-2">
                            <CardTitle className="flex-1">{loading ? <Skeleton className="h-6 flex-1 bg-neutral-300" /> : card.title}</CardTitle>
                            <CardAction className="my-auto">
                                <Ellipsis />
                            </CardAction>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-1">
                            <p className="font-bold text-4xl">{loading ? <Skeleton className="h-10 flex-1 bg-neutral-300" /> : `$${formatNumberWithCommas(card.price)}`}</p>
                            <p className="text-primary text-xs">{loading ? <Skeleton className="h-6 w-10 flex-1 bg-neutral-300" /> : `${card.rate}%`}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <TransactionTable />
        </div>
    );
}

const summaryCards = [
    { title: "Total Balance", price: 12345, rate: "+5" },
    { title: "Total Credits", price: 7890, rate: "+3" },
    { title: "Total Debits", price: 4455, rate: "-2" },
    { title: "Transactions", price: 150, rate: "+10" },
];
