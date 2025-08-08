import { Button } from "@/client/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/client/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/client/components/ui/dropdown-menu";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/client/components/ui/table";
import { formatNumberWithCommas } from "@/client/lib/utils";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

export function Transactions() {
    const [selectedRemark, setSelectedRemark] = useState<string | null>(null);

    const filteredInvoicesByRemark = selectedRemark ? invoices.filter((inv) => inv.remark === selectedRemark) : invoices;

    const statuses = [...new Set(invoices.map((inv) => inv.remark))];
    return (
        <div>
            <h2 className="mb-6 font-bold text-xl">Transactions</h2>
            <div className="grid grid-cols-4 gap-7 mb-8">
                {summaryCards.map((card, i) => (
                    <Card key={i} className=" bg-[#EAEFF0]">
                        <CardHeader className="flex items-center justify-between">
                            <CardTitle>{card.title}</CardTitle>
                            <CardAction>
                                <Ellipsis />
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-4xl">${formatNumberWithCommas(card.price)}</p>
                            <p className="text-primary text-xs">{card.rate}%</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[600px]">Date</TableHead>
                        <TableHead>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="p-0">
                                        Remark {selectedRemark && `: ${selectedRemark}`}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setSelectedRemark(null)}>All</DropdownMenuItem>
                                    {statuses.map((status) => (
                                        <DropdownMenuItem key={status} onClick={() => setSelectedRemark(status)}>
                                            {status}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Currency</TableHead>
                        <TableHead className="text-right">Type</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredInvoicesByRemark.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.date}</TableCell>
                            <TableCell>{invoice.remark}</TableCell>
                            <TableCell className="text-right">${invoice.amount.toLocaleString()}</TableCell>
                            <TableCell className="text-right">${invoice.currency}</TableCell>
                            <TableCell className="text-right">${invoice.type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

const summaryCards = [
    { title: "Total Balance", price: 12345, rate: "+5" },
    { title: "Total Credits", price: 7890, rate: "+3" },
    { title: "Total Debits", price: 4455, rate: "-2" },
    { title: "Transactions", price: 150, rate: "+10" },
];

const invoices = [
    { id: 1, date: "2023-10-01", remark: "Salary", amount: 3000, currency: "USD", type: "credit" },
    { id: 2, date: "2023-10-02", remark: "Groceries", amount: 150, currency: "USD", type: "debit" },
    { id: 3, date: "2023-10-03", remark: "Dinner", amount: 50, currency: "USD", type: "debit" },
    { id: 4, date: "2023-10-04", remark: "Rent", amount: 40, currency: "USD", type: "debit" },
];
