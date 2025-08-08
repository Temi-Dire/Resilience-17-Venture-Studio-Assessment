"use client";

import { CircleDollarSign, CirclePlus, Heart, MapPin, MoveRight, Sparkles, UserRound } from "lucide-react";

import { Button } from "@/client/components/ui/button";
import { useState } from "react";
import Concept from "./concept";

export function DashboardClientPage() {
    const [activePage, setActivePage] = useState<number>(0);
    return activePage === 0 ? (
        <div className="divide-y-8 divide-neutral-100">
            <header className="mb-2.5 flex w-full items-center justify-between bg-white px-8 py-5">
                <h1 className="font-medium text-2xl">Your Results</h1>
                <Button className="rounded-3xl bg-gradient-to-r from-[#35AA91] to-[#358474] py-6 text-xs">
                    <Sparkles />
                    <p>Generate New Concept</p>
                </Button>
            </header>
            <div className="mb-2.5 bg-white px-9 py-5">
                <p className="rounded-lg border border-[#DDDDDD80] px-3 py-2.5">
                    Based on your prompt: "Beach wedding in Vancouver with 80 guests. Live music, a buffet, and minimal decor." Here are 3 unique concepts tailored to your vision and budget. Select one to get your detailed planning guide.
                </p>
            </div>
            <ul className="grid grid-cols-3 gap-2.5 bg-[#FEFEFE] px-6 py-5">
                {cards.map((card) => (
                    <li key={card.id} className="rounded-2xl border border-neutral-100/30 bg-white p-4">
                        <span className="mb-1 rounded-sm bg-[#F9F9FC] px-1.5 py-1 text-[10px]">Concept {card.id}</span>
                        <h2 className="mb-2 font-medium text-lg">{card.title}</h2>
                        <p className="mb-5 text-sm">{card.description}</p>
                        <ul className="mb-10 flex flex-col gap-2.5">
                            <li className="flex items-center gap-2.5">
                                <Heart className="size-4 text-orange-600/90 " />
                                <p className="text-sm">Minimalistic Rustic</p>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <MapPin className="size-4 text-orange-600/90" />
                                <p className="text-sm">Spanish Banks Beach, Vancouver</p>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <CircleDollarSign className="size-4 text-orange-600/90" />
                                <p className="text-sm">$2,400-$3,000</p>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <UserRound className="size-4 text-orange-600/90" />
                                <p className="text-sm">80 Guests</p>
                            </li>
                        </ul>
                        <Button className="flex w-full items-center justify-center gap-1 rounded-2xl py-5 font-semibold text-xs" onClick={() => setActivePage(1)}>
                            <span>View Full Plan</span>
                            <MoveRight />
                        </Button>
                    </li>
                ))}
            </ul>

            <div className="mx-6 mt-2.5 mb-5 flex justify-center rounded-xl border-[#34B298] border-[0.5px] bg-primary/10 py-6">
                <div className="flex w-[402px] flex-col items-center text-center">
                    <h2 className="mb-1 font-medium text-primary text-xl">Need Something Different?</h2>
                    <p className="mb-2.5 font-medium text-xs leading-[22px]">These concepts are just the beginning. Planham can adjust any details or create entirely new concepts based on your feedback.</p>
                    <Button className="flex items-center justify-center gap-1 rounded-3xl px-3 py-5 ">
                        <span className="text-sm">Regenerate</span>
                        <CirclePlus />
                    </Button>
                </div>
            </div>
        </div>
    ) : (
        <Concept handleClick={() => setActivePage((prev) => prev - 1)} />
    );
}

const cards = [
    {
        id: 1,
        title: "Coastal Elegance Wedding",
        description: "A serene beachside ceremony with minimalist decor, soft linen drapes, and live acoustic music creating an intimate, romantic atmosphere.",
        tags: ["Minimalistic Rustic", "Spanish Banks Beach, Vancouver", "$2,400-$3,000", "80 Guests"],
    },
    {
        id: 2,
        title: "Seaside Bliss Wedding",
        description: "A serene beachside ceremony with minimalist decor, soft linen drapes, and live acoustic music creating an intimate, romantic atmosphere.",
        tags: ["Minimalistic Rustic", "Spanish Banks Beach, Vancouver", "$2,400-$3,000", "80 Guests"],
    },
    {
        id: 3,
        title: "Oceanfront Charm Wedding",
        description: "A serene beachside ceremony with minimalist decor, soft linen drapes, and live acoustic music creating an intimate, romantic atmosphere.",
        tags: ["Minimalistic Rustic", "Spanish Banks Beach, Vancouver", "$2,400-$3,000", "80 Guests"],
    },
];
