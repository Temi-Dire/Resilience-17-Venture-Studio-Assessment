import BottomNav from "@/client/components/shared/bottom-nav";
import { AppSidebar } from "@/client/components/shared/dashboard-sidebar";
import { SidebarProvider } from "@/client/components/ui/sidebar";
import type React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="flex">
            <AppSidebar />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <BottomNav />
        </SidebarProvider>
    );
}
