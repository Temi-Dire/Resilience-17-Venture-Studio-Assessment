"use client";

import { cn } from "@/client/lib/utils";
import { Home, Settings, ArrowLeftRight, ClipboardMinus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow md:hidden">
            <ul className="flex justify-around items-center h-16">
                <li>
                    <Link href="/app">
                        <div className={cn("flex flex-col items-center text-sm text-muted-foreground hover:text-primary", pathname.endsWith("/app") && "text-primary")}>
                            <Home className="h-5 w-5" />
                            <span>Home</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/app/transactions">
                        <div className={cn("flex flex-col items-center text-sm text-muted-foreground hover:text-primary", pathname.endsWith("/transactions") && "text-primary")}>
                            <ArrowLeftRight className="h-5 w-5" />
                            <span>Transaction</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/app/reports">
                        <div className={cn("flex flex-col items-center text-sm text-muted-foreground hover:text-primary", pathname.endsWith("/reports") && "text-primary")}>
                            <ClipboardMinus className="h-5 w-5" />
                            <span>Reports</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/app/settings">
                        <div className={cn("flex flex-col items-center text-sm text-muted-foreground hover:text-primary", pathname.endsWith("/settings") && "text-primary")}>
                            <Settings className="h-5 w-5" />
                            <span>Settings</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
