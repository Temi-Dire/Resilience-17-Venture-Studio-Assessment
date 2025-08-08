import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/client/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/client/components/ui/dropdown-menu";
import { Skeleton } from "@/client/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/client/components/ui/table";
import { cn, formatCurrency, formatNumberWithCommas } from "@/client/lib/utils";
import type { Transaction } from "@/client/types";
import { Ellipsis, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Overview() {
    const [selectedRemark, setSelectedRemark] = useState<string | null>(null);
    const [dateSortOrder, setDateSortOrder] = useState<"asc" | "desc">("asc"); // default ascending
    const [amountSortOrder, setAmountSortOrder] = useState<"asc" | "desc" | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null); // null = all
    const [selectedType, setSelectedType] = useState<"Credit" | "Debit" | null>(null); // null = all

    const [loading, setLoading] = useState(true); // Loader state

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds delay
        return () => clearTimeout(timer);
    }, []);

    const remarks = [...new Set(transactions.map((t) => t.remark))];
    const currencies = [...new Set(transactions.map((t) => t.currency))];
    const types = ["Credit", "Debit"];

    const filteredTransactions = transactions
        .filter((t) => !selectedRemark || t.remark === selectedRemark)
        .filter((t) => !selectedCurrency || t.currency === selectedCurrency)
        .filter((t) => !selectedType || t.type === selectedType)
        .sort((a, b) => {
            if (dateSortOrder) {
                return dateSortOrder === "asc" ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            return 0;
        })
        .sort((a, b) => {
            if (amountSortOrder) {
                return amountSortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
            }
            return 0;
        });

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

            {/* Loader */}
            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                </div>
            ) : (
                <Table>
                    <TableCaption>A list of your recent transactions.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            {/* Date Filter */}
                            <TableHead className="w-[600px]">
                                <div className="flex items-center gap-1.5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="p-0">
                                                Date ({dateSortOrder === "asc" ? "Ascending" : "Descending"})
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => setDateSortOrder("asc")}>Ascending</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setDateSortOrder("desc")}>Descending</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Image src={"/assets/icons/dropdown-icon-grey.svg"} alt="dropdown" width={8} height={8} />
                                </div>
                            </TableHead>

                            {/* Remark Filter */}
                            <TableHead>
                                <div className="flex items-center gap-1.5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="p-0">
                                                Remark {selectedRemark && `(${selectedRemark})`}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => setSelectedRemark(null)}>All</DropdownMenuItem>
                                            {remarks.map((status) => (
                                                <DropdownMenuItem key={status} onClick={() => setSelectedRemark(status)}>
                                                    {status}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Image src={"/assets/icons/dropdown-icon-grey.svg"} alt="dropdown" width={8} height={8} />
                                </div>
                            </TableHead>

                            {/* Amount Filter */}
                            <TableHead>
                                <div className="flex items-center gap-1.5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="p-0">
                                                Amount {amountSortOrder && `(${amountSortOrder === "asc" ? "Ascending" : "Descending"})`}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => setAmountSortOrder("asc")}>Ascending</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setAmountSortOrder("desc")}>Descending</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setAmountSortOrder(null)}>Clear</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Image src={"/assets/icons/dropdown-icon-grey.svg"} alt="dropdown" width={8} height={8} />
                                </div>
                            </TableHead>

                            {/* Currency Filter */}
                            <TableHead>
                                <div className="flex items-center gap-1.5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="p-0">
                                                Currency {selectedCurrency || "(All)"}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => setSelectedCurrency(null)}>All</DropdownMenuItem>
                                            {currencies.map((cur) => (
                                                <DropdownMenuItem key={cur} onClick={() => setSelectedCurrency(cur)}>
                                                    {cur}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Image src={"/assets/icons/dropdown-icon-grey.svg"} alt="dropdown" width={8} height={8} />
                                </div>
                            </TableHead>

                            {/* Type Filter */}
                            <TableHead>
                                <div className="flex items-center gap-1.5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="p-0">
                                                Type {selectedType || "(All)"}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => setSelectedType(null)}>All</DropdownMenuItem>
                                            {types.map((t) => (
                                                <DropdownMenuItem key={t} onClick={() => setSelectedType(t as "Credit" | "Debit")}>
                                                    {t}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Image src={"/assets/icons/dropdown-icon-grey.svg"} alt="dropdown" width={8} height={8} />
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell className="font-medium">{transaction.date}</TableCell>
                                <TableCell>{transaction.remark}</TableCell>
                                <TableCell className="text-left">{formatCurrency(transaction.amount, transaction.currency)}</TableCell>
                                <TableCell className="text-left">{transaction.currency}</TableCell>
                                <TableCell className="text-left">
                                    <Badge variant="secondary" className="gap-2 rounded-full px-3 py-2">
                                        <div className={cn("size-1.5 rounded-full", transaction.type === "Credit" ? "bg-green-800" : "bg-red-700")} />
                                        <p>{transaction.type}</p>
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}

const summaryCards = [
    { title: "Total Balance", price: 12345, rate: "+5" },
    { title: "Total Credits", price: 7890, rate: "+3" },
    { title: "Total Debits", price: 4455, rate: "-2" },
    { title: "Transactions", price: 150, rate: "+10" },
];

const transactions: Transaction[] = [
    {
        id: "INV-001",
        date: "2023-10-01",
        remark: "Salary",
        amount: 3000,
        currency: "USD",
        type: "Credit",
    },
    {
        id: "INV-002",
        date: "2023-10-02",
        remark: "Groceries",
        amount: -150,
        currency: "USD",
        type: "Debit",
    },
    {
        id: "INV-003",
        date: "2023-10-03",
        remark: "Gym Membership",
        amount: -50,
        currency: "USD",
        type: "Debit",
    },
    {
        id: "INV-004",
        date: "2023-10-04",
        remark: "Dinner",
        amount: -40,
        currency: "USD",
        type: "Debit",
    },
    {
        id: "INV-005",
        date: "2023-10-05",
        remark: "Movie Tickets",
        amount: -30,
        currency: "USD",
        type: "Debit",
    },
    {
        id: "INV-006",
        date: "2023-10-06",
        remark: "Rent",
        amount: -1200,
        currency: "USD",
        type: "Debit",
    },
    {
        id: "INV-007",
        date: "2023-10-07",
        remark: "Utilities",
        amount: -100,
        currency: "USD",
        type: "Debit",
    },
    {
        id: "INV-008",
        date: "2023-10-08",
        remark: "Car Payment",
        amount: -400,
        currency: "USD",
        type: "Debit",
    },
    {
        id: "INV-009",
        date: "2023-10-09",
        remark: "Insurance",
        amount: -200,
        currency: "USD",
        type: "Debit",
    },
];
