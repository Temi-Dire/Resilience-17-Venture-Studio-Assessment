"use client";

import { cn } from "@/client/lib/utils";
import { UserPlus, Image as ImageIcon, CalendarDays, BadgeDollarSign } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function OnboardingFlow() {
    const pathname = usePathname();
    return (
        <div className="m-2.5 flex h-screen w-[500px] flex-col gap-20 rounded-t-2xl bg-gradient-to-br from-[#261E4C] to-[#0A081B] px-4 pt-14 pb-6 text-white">
            <Image src={"/assets/logo/logo-icon-text-primary.svg"} alt="Company Logo" width={176} height={50} />
            <section>
                <ul className="flex flex-col gap-9">
                    {tabs.map((tab, i) => (
                        <li key={i} className={cn("relative flex gap-2.5 transition-opacity", pathname.endsWith(tab.id) ? "opacity-100" : "opacity-50")}>
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-white ">{tab.icon}</div>
                            <div className="flex flex-col gap-1">
                                <p className="font-medium">{tab.title}</p>
                                <p className="text-xs">{tab.description}</p>
                            </div>
                            {i !== tabs.length - 1 && <div className="absolute top-10 left-5 h-14 w-0.5 bg-[#696577]" />}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

const tabs = [
    { icon: <UserPlus color="black" size={14} />, title: "Your Business Info", description: "This helps clients learn about who you are and what you offer. The more complete, the better your matches", id: "your-business-info" },
    { icon: <ImageIcon color="black" size={14} />, title: "Media upload", description: "Upload photos or videos from your past events. This is your chance to shine—clients love seeing what you've done.", id: "media-upload" },
    {
        icon: <CalendarDays color="black" size={14} />,
        title: "Availability",
        description: "Let us know when you're open for bookings. We’ll only match you with events that fit your schedule. You can update this anytime",
        id: "availability",
    },
    {
        icon: <BadgeDollarSign color="black" size={14} />,
        title: "Pricing and Packages",
        description: "Create service packages that clearly outline what you provide and what it costs. Keep it simple and transparent",
        id: "pricing-and-packages",
    },
];
