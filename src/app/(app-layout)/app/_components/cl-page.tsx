"use client";

import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/client/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/client/components/ui/dropdown-menu";
import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs";
import { Overview } from "./overview";
import { Transactions } from "./transactions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/client/components/ui/tooltip";
import { useRouter } from "next/navigation";
import CategorySearch from "@/client/components/shared/category-search";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/client/components/ui/dialog";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/client/components/ui/alert-dialog";
import { toast } from "sonner";

export function HomeClientPage() {
    const [selected, setSelected] = useState("Wallet Ledger");
    const router = useRouter();

    const handleSelect = (value: string) => {
        setSelected(value);
    };

    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        // Runs only on client
        setCurrentUrl(window.location.href);
    }, []);
    return (
        <section className="flex min-h-screen w-full w-screen flex-1 flex-col gap-6 bg-white sm:w-auto">
            <header className="sticky top-0 z-10 flex items-center justify-between gap-2 bg-white px-4 py-4 sm:py-8 shadow-sm sm:flex-wrap sm:gap-0 sm:px-6 md:justify-end md:px-8">
                {/* Logo (hidden on md and up) */}
                <Link href="/app" className="relative flex-shrink-0 md:hidden">
                    <Image src="/assets/logo/fintrack-pig-logo.svg" alt="Logo" width={32} height={32} />
                </Link>

                {/* Right section */}
                <div className="flex min-w-0 flex-wrap items-center gap-3 sm:gap-4 md:gap-7">
                    <div className="min-w-0 flex-1">
                        <CategorySearch onSelect={(val) => setSelected(val)} />
                    </div>

                    {/* Dropdown Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Image src={"/assets/icons/dashboard.svg"} alt="Dashboard Icon" width={24} height={24} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Menu</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Profile Avatar */}
                    <Tooltip>
                        <TooltipTrigger onClick={() => router.push("/app/settings")}>
                            <Avatar>
                                <AvatarImage src="/assets/images/profile-picture.svg" alt="@shadcn" />
                                <AvatarFallback>TD</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Profile Settings</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </header>

            <div className="flex w-full flex-col justify-between gap-4 px-8 md:flex-row md:items-center md:gap-0">
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="ml-auto flex cursor-pointer items-center gap-2">
                                <div className="flex items-center gap-2 border-none">
                                    <h1 className="font-bold text-xl sm:text-4xl ">{selected}</h1>
                                    <Image src={"/assets/icons/dropdown-icon.svg"} alt="dropdown" width={24} height={24} />
                                </div>
                                <Badge variant="secondary" className="rounded-full px-3 py-2">
                                    <div className="size-1.5 rounded-full bg-[#087A2E]" />
                                    <p>Active</p>
                                </Badge>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleSelect("Wallet Ledger")}>Wallet Ledger</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSelect("Bills & Utilities")}>Bills & Utilities</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSelect("Subscriptions")}>Subscriptions</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSelect("Others")}>Others</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center gap-4">
                    <Dialog>
                        <form>
                            <DialogTrigger asChild>
                                <Button className="text-black">Share</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Share Fintrack Report</DialogTitle>
                                    <DialogDescription>Copy the link below so you can share with your team.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name-1">Url</Label>
                                        <Input id="name-1" name="name" value={currentUrl} defaultValue={currentUrl} />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="rounded-full border border-[#D8DFE0] bg-white text-black hover:text-white" variant="ghost">
                                <Ellipsis />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => toast.success("Document is downloading")}>Download PDF</DropdownMenuItem>
                            <DropdownMenuSeparator />

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant={"secondary"} className="-mx-1 cursor-pointer bg-white text-red-500 shadow-none hover:bg-white">
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>This action cannot be undone. This will permanently delete this category and remove the data from our servers.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => toast.success(`${selected} has been deleted successfully!`)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="flex items-center gap-1 px-8 text-[#6D797C] text-xs tracking-tighter">
                <div className="-space-x-2 flex *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                        <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage src="https://github.com/leerob.png" alt="@evilrabbit" />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                </div>
                <div className="ml-2">Ava, Liam, Noah</div>
                <div>+12 others</div>
            </div>
            <Tabs defaultValue="overview" className="w-full px-8">
                <TabsList className="my-4 bg-white">
                    <TabsTrigger value="overview" className="text-[#6D797C]">
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="password" className="text-[#6D797C]">
                        Transactions
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <Overview />
                </TabsContent>
                <TabsContent value="password">
                    <Transactions />
                </TabsContent>
            </Tabs>
        </section>
    );
}
