"use client";

import { Ellipsis, Search } from "lucide-react";
import Image from "next/image";
import { Input } from "@/client/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/client/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/client/components/ui/dropdown-menu";
import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs";
import { Overview } from "./overview";
import { Transactions } from "./transactions";

export function HomeClientPage() {
    return (
        <section className="flex w-full flex-1 flex-col gap-6 bg-gray-50 min-h-screen">
            <header className="flex justify-end py-8 bg-white shadow-sm px-8">
                <div className="flex items-center gap-7">
                    <div className="flex w-80 flex-1 items-center gap-2.5 rounded-4xl border px-4 transition-colors focus-within:border-[#437D8E]">
                        <Input className="border-none px-0 font-normal text-black shadow-none outline-0 ring-0 placeholder:text-black focus-visible:ring-0" placeholder="Search" />
                        <Search className="!w-5 !h-5" />
                    </div>
                    <Image src={"/assets/icons/dashboard.svg"} alt="Dashboard Icon" width={24} height={24} />
                    <Avatar>
                        <AvatarImage src="/assets/images/profile-picture.svg" alt="@shadcn" />
                        <AvatarFallback>TD</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row w-full md:items-center justify-between px-8">
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="ml-auto flex items-center gap-2 ">
                                <div className="flex items-center gap-2 border-none">
                                    <h1 className="font-bold text-4xl">Wallet Ledger</h1>
                                    <Image src={"/assets/icons/dropdown-icon.svg"} alt="dropdown" width={24} height={24} />
                                </div>
                                <Badge variant="secondary" className="rounded-full py-2 px-3">
                                    <div className="size-1.5 rounded-full bg-[#087A2E]" />
                                    <p>Active</p>
                                </Badge>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">e</DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center gap-4">
                    <Button className="text-black rounded-2xl">Share</Button>
                    <Button className="bg-white border border-[#D8DFE0] rounded-full">
                        <Ellipsis color="black" />
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-1 text-[#6D797C] text-xs tracking-tighter px-8">
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
                        <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                </div>
                <div className="ml-2">Ava, Liam, Noah</div>
                <div>+12 others</div>
            </div>
            <Tabs defaultValue="overview" className="w-full px-8">
                <TabsList className="my-4 bg-white">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="password">Transactions</TabsTrigger>
                </TabsList>
                <TabsContent value="overview"><Overview /></TabsContent>
                <TabsContent value="password"><Transactions /></TabsContent>
            </Tabs>
        </section>
    );
}
