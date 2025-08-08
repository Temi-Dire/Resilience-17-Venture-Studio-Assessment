import { ChevronRight, Settings, ShieldCheck, SlidersHorizontal, UserRound } from "lucide-react";
import type React from "react";

import { Tabs, TabsList, TabsTrigger } from "@/client/components/ui/tabs";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <Tabs className="flex h-screen flex-row items-stretch gap-0" defaultValue="basic-information">
            <div className="flex-[0.35] border-neutral-200 border-r">
                <div className="flex w-full flex-col">
                    <h1 className="flex items-center border-b border-b-neutral-200 px-4 pt-8 pb-3 font-medium text-xl">Your Profile</h1>
                    <TabsList className="flex h-full w-full flex-col items-start justify-normal gap-y-2 rounded-none bg-transparent px-4 py-9 text-left text-basecolor shadow-none">
                        <TabsTrigger
                            value="basic-information"
                            className="flex w-full items-center justify-between gap-2 rounded-lg border border-transparent px-2.5 py-5 font-medium text-basecolor text-sm leading-[150%] transition-colors hover:bg-[#F3F4F6] data-[state=active]:border-primary data-[state=active]:bg-[#DDF2EE]/20 data-[state=active]:text-primary data-[state=active]:shadow-md"
                        >
                            <div className="flex flex-1 items-center gap-2">
                                <UserRound className="!w-6 !h-6" />
                                <span>Basic Information</span>
                            </div>
                            <ChevronRight className="!w-5 !h-5" />
                        </TabsTrigger>

                        {/* Security */}
                        <TabsTrigger
                            value="security"
                            className="flex w-full items-center justify-between gap-2 rounded-lg border border-transparent px-2.5 py-5 font-medium text-basecolor text-sm leading-[150%] transition-colors hover:bg-[#F3F4F6] data-[state=active]:border-primary data-[state=active]:bg-[#DDF2EE]/20 data-[state=active]:text-primary data-[state=active]:shadow-md"
                        >
                            <div className="flex flex-1 items-center gap-2">
                                <ShieldCheck className="!w-6 !h-6" />
                                <span>Security</span>
                            </div>
                            <ChevronRight className="!w-5 !h-5" />
                        </TabsTrigger>

                        {/* Preferences */}
                        <TabsTrigger
                            value="preferences"
                            className="flex w-full items-center justify-between gap-2 rounded-lg border border-transparent px-2.5 py-5 font-medium text-basecolor text-sm leading-[150%] transition-colors hover:bg-[#F3F4F6] data-[state=active]:border-primary data-[state=active]:bg-[#DDF2EE]/20 data-[state=active]:text-primary data-[state=active]:shadow-md"
                        >
                            <div className="flex flex-1 items-center gap-2">
                                <SlidersHorizontal className="!w-6 !h-6" />
                                <span>Preferences</span>
                            </div>
                            <ChevronRight className="!w-5 !h-5" />
                        </TabsTrigger>

                        {/* Account Settings */}
                        <TabsTrigger
                            value="account-settings"
                            className="flex w-full items-center justify-between gap-2 rounded-lg border border-transparent px-2.5 py-5 font-medium text-basecolor text-sm leading-[150%] transition-colors hover:bg-[#F3F4F6] data-[state=active]:border-primary data-[state=active]:bg-[#DDF2EE]/20 data-[state=active]:text-primary data-[state=active]:shadow-md"
                        >
                            <div className="flex flex-1 items-center gap-2">
                                <Settings className="!w-6 !h-6" />
                                <span>Account Settings</span>
                            </div>
                            <ChevronRight className="!w-5 !h-5" />
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Sidebar can be here */}
            </div>
            <div className="flex-[0.65]">{children}</div>
        </Tabs>
    );
}
