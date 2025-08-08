"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs";

import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/client/components/ui/card";
import { Input } from "@/client/components/ui/input";
import { cn, debounce, formatNumberWithCommas } from "@/client/lib/utils";
import type { Transaction } from "@/client/types";

export type TransactionTabTypes = "All" | "Pending" | "Declined" | "Processed";

export function TransactionsClientPage() {
    const tabs: TransactionTabTypes[] = ["All", "Pending", "Declined", "Processed"];
    const [activeTab, setActiveTab] = useState<TransactionTabTypes>("All");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = useMemo(
        () =>
            debounce((value: string) => {
                setSearchTerm(value.trim().toLowerCase());
            }, 300),
        []
    );

    const filteredData = useMemo(() => {
        let data = transactionDummyData;

        // 🔍 Filter by search term
        if (searchTerm) {
            data = data.filter((item) =>
                [item.id, item.date, item.remark, item.amount, item.currency, item.type] // adjust for real fields
                    .some((field) => field.toString().toLowerCase().includes(searchTerm))
            );
        }

        // 📌 Filter by tab
        if (activeTab !== "All") {
            data = data.filter((item) => item.remark === activeTab);
        }

        return data;
    }, [activeTab, searchTerm]);

    return (
        <section className="min-h-screen w-screen sm:w-auto">
            <header className="mb-2.5 flex w-full items-center justify-between bg-white py-8 px-8 shadow-sm">
                <h1 className="font-semibold text-xl">Transactions</h1>
            </header>

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TransactionTabTypes)} className="w-full">
                <div className="flex flex-col gap-5 lg:flex-row justify-between bg-white py-6 px-8">
                    <div className="overflow-x-auto">
                        <TabsList className="flex gap-2 bg-[#F9F9F9] text-sm">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab}
                                    value={tab}
                                    className="w-[110px] !h-8 flex items-center justify-center transition-colors data-[state=active]:rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white"
                                >
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>
                    <div className="relative w-full sm:w-[300px]">
                        <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
                        <Input type="text" placeholder="Search..." className="pl-10" onChange={(e) => handleSearch(e.target.value)} />
                    </div>
                </div>

                <TabsContent value={activeTab} className="data-[state=inactive]:hidden data-[state=active]:flex-1">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
                        {filteredData.map((card, i) => (
                            <TransactionCard data={card} key={i} />
                        ))}
                    </ul>
                </TabsContent>
            </Tabs>
        </section>
    );
}

const TransactionCard = (props: { data: Transaction }) => {
    return (
        <Card className="cursor-pointer gap-4 shadow-none drop-shadow-sm">
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="break-words text-sm">{props.data.id}</CardTitle>
                <CardAction
                    className={cn("flex-shrink-0 rounded-sm border p-1 text-xs", {
                        "border-primary bg-primary/10 text-primary": props.data.remark === "Processed",
                        "border-yellow-400 bg-yellow-100/50 text-yellow-400": props.data.remark === "Pending",
                        "border-red-400 bg-red-100 text-red-400": props.data.remark === "Declined",
                    })}
                >
                    {props.data.remark}
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <p className="font-semibold">Date:</p>
                    <p className="text-sm">{props.data.date}</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="font-semibold">Currency:</p>
                    <p className="text-sm">{props.data.currency}</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="font-semibold">Amount:</p>
                    <p className="text-sm">{props.data.currency === "USD" ? `$${formatNumberWithCommas(props.data.amount)}` : `₦${formatNumberWithCommas(props.data.amount)}`}</p>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex items-center gap-2">
                    <p className="font-semibold">type:</p>
                    <p className="text-sm">{props.data.type}</p>
                </div>
            </CardFooter>
        </Card>
    );
};

export const transactionDummyData: Transaction[] = [
    { id: "INV001", date: "", remark: "Declined", amount: 4000, currency: "USD", type: "Credit" },
    { id: "INV002", date: "", remark: "Pending", amount: 3000, currency: "NGN", type: "Credit" },
    { id: "INV003", date: "", remark: "Pending", amount: 4500, currency: "NGN", type: "Credit" },
    { id: "INV004", date: "", remark: "Processed", amount: 6000, currency: "USD", type: "Credit" },
    { id: "INV005", date: "", remark: "Declined", amount: 1000, currency: "USD", type: "Credit" },
    { id: "INV006", date: "", remark: "Processed", amount: 2000, currency: "NGN", type: "Credit" },
];
