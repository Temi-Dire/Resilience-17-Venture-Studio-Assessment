import { Trash } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/client/components/ui/table";
import { Button } from "@/client/components/ui/button";

export const Tasks = () => {
    return (
        <div className="flex flex-col gap-8 bg-white py-6">
            <h1 className="font-medium text-lg">Tasks</h1>
            <Table className="">
                <TableHeader className="">
                    <TableRow>
                        <TableHead className="pt-8 pb-7">Name</TableHead>
                        <TableHead className="pt-8 pb-7">Due Date</TableHead>
                        <TableHead className="pt-8 pb-7">Priority</TableHead>
                        <TableHead className="pt-8 pb-7">Status</TableHead>
                        <TableHead />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* 1 */}
                    <TableRow>
                        <TableCell className="py-7 font-medium">Confirm Catering Menu</TableCell>
                        <TableCell className="py-7">July 30, 2025</TableCell>
                        <TableCell className="py-7">
                            <div className="inline-block rounded-sm border border-red-400 bg-red-100 px-4 py-1 text-red-400">High</div>
                        </TableCell>
                        <TableCell className="py-7">
                            <div className="inline-block rounded-sm border border-yellow-400 bg-yellow-100/50 px-4 py-1 text-yellow-400">In Progress</div>
                        </TableCell>
                        <TableCell className="py-7">
                            <Button variant="ghost" className="p-0 hover:bg-transparent">
                                <Trash className="size-6 text-[#726C6C]" />
                            </Button>
                        </TableCell>
                    </TableRow>

                    {/* 2 */}
                    <TableRow>
                        <TableCell className="py-7 font-medium">Receive Decor Delivery</TableCell>
                        <TableCell className="py-7">July 26, 2025</TableCell>
                        <TableCell className="py-7">
                            <div className="inline-block rounded-sm border border-yellow-400 bg-yellow-100/50 px-4 py-1 text-yellow-400">Medium</div>
                        </TableCell>
                        <TableCell className="py-7">
                            <div className="inline-block rounded-sm border border-primary bg-primary/10 px-4 py-1 text-primary">Completed</div>
                        </TableCell>
                        <TableCell className="py-7">
                            <Button variant="ghost" className="p-0 hover:bg-transparent">
                                <Trash className="size-6 text-[#726C6C]" />
                            </Button>
                        </TableCell>
                    </TableRow>

                    {/* 3 */}
                    <TableRow>
                        <TableCell className="py-7 font-medium">Send Invitations</TableCell>
                        <TableCell className="py-7">July 15, 2025</TableCell>
                        <TableCell className="py-7">
                            <div className="inline-block rounded-sm border border-red-400 bg-red-100 px-4 py-1 text-red-400">High</div>
                        </TableCell>
                        <TableCell className="py-7">
                            <div className="inline-block rounded-sm border border-red-400 bg-red-100 px-4 py-1 text-red-400">Not Started</div>
                        </TableCell>
                        <TableCell className="py-7">
                            <Button variant="ghost" className="p-0 hover:bg-transparent">
                                <Trash className="size-6 text-[#726C6C]" />
                            </Button>
                        </TableCell>
                    </TableRow>

                    {/* 4 */}
                    <TableRow>
                        <TableCell className="py-7 font-medium">Finalize Entertainment Booking</TableCell>
                        <TableCell className="py-7">July 28, 2025</TableCell>
                        <TableCell className="py-7">
                            <div className="inline-block rounded-sm border border-primary bg-primary/10 px-4 py-1 text-primary">Low</div>
                        </TableCell>
                        <TableCell className="py-7">
                            <div className="inline-block rounded-sm border border-yellow-400 bg-yellow-100/50 px-4 py-1 text-yellow-400">In Progress</div>
                        </TableCell>
                        <TableCell className="py-7">
                            <Button variant="ghost" className="p-0 hover:bg-transparent">
                                <Trash className="size-6 text-[#726C6C]" />
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};
