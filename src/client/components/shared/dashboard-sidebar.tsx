"use client";

import { ArrowLeftRight, Bell, ClipboardMinus, Home, Menu, Mic, Search, Settings, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";

import { cn } from "@/client/lib/utils";
import { NoNotificationIcon } from "@/client/components/svg-icons/no-notifications-icon";
import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/client/components/ui/sheet";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, useSidebar } from "@/client/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export function AppSidebar() {
    const { state, toggleSidebar } = useSidebar();
    const collapsed = state === "collapsed";
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // This runs before first paint
    useLayoutEffect(() => {
        const small = window.innerWidth < 905;
        setIsSmallScreen(small);

        if (small && !collapsed) {
            toggleSidebar(); // collapse before rendering
        }
    }, []); // only on mount

    // Keep listening for resizes afterward
    useEffect(() => {
        const checkScreen = () => {
            const small = window.innerWidth < 905;
            setIsSmallScreen(small);

            if (small && !collapsed) {
                toggleSidebar();
            }
        };

        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, [collapsed, toggleSidebar]);

    const handleToggle = () => {
        if (!isSmallScreen) {
            toggleSidebar();
        } else {
            toast.error("Please switch to a larger screen");
        }
    };

    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon" className="z-20 border-none">
            <SidebarContent className="flex flex-col justify-between bg-white p-0">
                <SidebarGroup className="flex flex-1 justify-between gap-11 p-0">
                    <SidebarGroupContent className="flex flex-1 flex-col justify-between gap-11">
                        {!collapsed && (
                            <SidebarMenu className="flex flex-col gap-11 px-4 pt-8">
                                <SidebarMenuItem className="flex items-center">
                                    <Button variant="ghost" className="cursor-pointer p-2 hover:bg-transparent" onClick={toggleSidebar}>
                                        <Menu className="!h-4 !w-4 text-[#1B2528]" />
                                    </Button>
                                    <figure className="relative h-9 w-full max-w-34">
                                        <Image src="/assets/logo/fintrack-logo.svg" fill objectFit="contain" alt="" />
                                    </figure>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        )}
                        {collapsed && (
                            <SidebarMenu className="flex flex-col gap-11 pt-8">
                                <SidebarMenuItem className="flex justify-center">
                                    <Link href="/app" className="relative h-9 w-full">
                                        <Image src="/assets/logo/fintrack-pig-logo.svg" fill objectFit="contain" alt="" />
                                    </Link>
                                </SidebarMenuItem>

                                <Button variant="ghost" className="p-2 hover:bg-transparent" onClick={handleToggle}>
                                    <Menu className="!h-4 !w-4 text-[#1B2528]" />
                                </Button>
                            </SidebarMenu>
                        )}

                        {/* Navigation Items */}
                        <SidebarMenu className="flex flex-1 flex-col justify-between pr-2.5 pl-3">
                            <div className="flex flex-col justify-between gap-2.5">
                                <SidebarMenuItem>
                                    <a
                                        href="/app"
                                        className={cn("!py-4 !px-6 flex items-center gap-2 rounded-2xl font-medium text-black text-sm transition-colors hover:bg-[#DDF2EE] hover:text-[#261E4C]", {
                                            "!p-4.5": collapsed,
                                            "!bg-[#DDF2EE] !text-[#261E4C]": pathname === "/app",
                                        })}
                                    >
                                        <Home className="!h-5 !w-5" />
                                        {!collapsed && <span>Dashboard</span>}
                                    </a>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <a
                                        href="/app/transactions"
                                        className={cn("!py-4 !px-6 flex items-center gap-2 rounded-2xl font-medium text-black text-sm transition-colors hover:bg-[#DDF2EE] hover:text-[#261E4C]", {
                                            "!p-4.5": collapsed,
                                            "!bg-[#DDF2EE] !text-[#261E4C]": pathname.includes("/app/transactions"),
                                        })}
                                    >
                                        <ArrowLeftRight className="!h-5 !w-5" />
                                        {!collapsed && <span>Transactions</span>}
                                    </a>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <a
                                        href="/app/reports"
                                        className={cn("!py-4 !px-6 flex items-center gap-2 rounded-2xl font-medium text-black text-sm transition-colors hover:bg-[#DDF2EE] hover:text-[#261E4C]", {
                                            "!p-4.5": collapsed,
                                            "!bg-[#DDF2EE] !text-[#261E4C]": pathname.includes("/app/reports"),
                                        })}
                                    >
                                        <ClipboardMinus className="!h-5 !w-5" />
                                        {!collapsed && <span>Reports</span>}
                                    </a>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <a
                                        href="/app/settings?tab=basic-information"
                                        className={cn("!py-4 !px-6 flex items-center gap-2 rounded-2xl font-medium text-black text-sm transition-colors hover:bg-[#DDF2EE] hover:text-[#261E4C]", {
                                            "!p-4.5": collapsed,
                                            "!bg-[#DDF2EE] !text-[#261E4C]": pathname.includes("/app/settings"),
                                        })}
                                    >
                                        <Settings className="!h-5 !w-5" />
                                        {!collapsed && <span>Settings</span>}
                                    </a>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <NotificationsSheet collapsed={collapsed} />
                                </SidebarMenuItem>
                            </div>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

const NotificationsSheet = (props: { collapsed: boolean }) => {
    const [emptyNotification, setEmptyNotificaiton] = useState(true);

    return (
        <Sheet>
            <SheetTrigger className={cn("!py-4 !px-6 flex w-full items-center gap-2 rounded-2xl font-medium text-black text-sm transition-colors hover:bg-[#DDF2EE] hover:text-[#261E4C]", { "!p-4.5": props.collapsed })}>
                <Bell className="!h-5 !w-5" />
                {!props.collapsed && <span>Notifications</span>}
            </SheetTrigger>
            <SheetContent className="flex min-h-0 flex-col px-5">
                <SheetHeader className="border-b border-b-[#E4E7EB] px-0 py-6">
                    <SheetTitle>Notifications</SheetTitle>
                </SheetHeader>
                <div
                    className={cn("flex min-h-0 flex-1 flex-col gap-4", {
                        "gap-28": emptyNotification,
                    })}
                >
                    <div className="flex flex-col gap-6">
                        <Label className="rounded-full border border-neutral-100/50 bg-white px-5 py-1">
                            <div className="flex flex-1 items-center gap-2.5">
                                <Search className="!w-5 !h-5" />
                                <Input className="border-none px-0 font-normal text-black shadow-none outline-0 ring-0 placeholder:text-black focus-visible:ring-0" placeholder="Search" />
                            </div>
                            <Button className="h-7.5 w-7.5 rounded-full">
                                <Mic className="!w-3.5 !h-3.5" />
                            </Button>
                        </Label>
                    </div>

                    {!emptyNotification && (
                        <div className="flex flex-1 flex-col gap-4 overflow-scroll">
                            <div className="flex flex-col gap-2.5">
                                <p className="font-medium text-black">Today</p>
                                <ul className="divide-y divide-neutral-200">
                                    {Array.from({ length: 3 }).map((_, idx) => (
                                        <NotificationCard key={idx} />
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <p className="font-medium text-black">Yesterday</p>
                                <ul className="divide-y divide-neutral-200">
                                    {Array.from({ length: 3 }).map((_, idx) => (
                                        <NotificationCard key={idx} />
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <p className="font-medium text-black">Last Week</p>
                                <ul className="divide-y divide-neutral-200">
                                    {Array.from({ length: 3 }).map((_, idx) => (
                                        <NotificationCard key={idx} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    {emptyNotification && (
                        <button className="flex w-full flex-col items-center gap-4" onClick={() => setEmptyNotificaiton(!emptyNotification)} type="button">
                            {/* This button is temporary to show each state */}
                            <NoNotificationIcon className="w-full max-w-9/10" />
                            <div className="flex flex-col items-center">
                                <p className="font-medium text-black">Hey There!</p>
                                <p className="text-gray-500">You currently have no notificaitons</p>
                            </div>
                        </button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

const NotificationCard = () => {
    return (
        <li className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2.5">
                <figure className="size-10 rounded-full bg-neutral-200" />
                <div className="flex flex-col gap-0.5">
                    <p className="font-medium text-black text-sm">Notification Head</p>

                    <div className="flex flex-col">
                        <p className="font-medium text-neutral-500 text-xs">Body Copy Here</p>
                        <p className="text-[10px] text-neutral-500">time ago</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-red-600" />
                <Button variant="ghost" className="ronuded-none hover:bg-transparent">
                    <X className="!w-5 !h-5" />
                </Button>
            </div>
        </li>
    );
};
