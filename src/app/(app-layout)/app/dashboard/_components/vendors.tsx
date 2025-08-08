import { Mail, Star, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/client/components/ui/button";

export const Vendors = () => {
    return (
        <div className="bg-white py-6">
            <div className="mb-10 flex flex-col gap-2.5">
                <h2 className="font-medium text-black text-xl">Vendors</h2>
                <p className="text-neutral-500 text-sm">Review your selected vendors below. You can remove any or add new ones from our suggested list to better suit your event needs.</p>
            </div>
            <ul className="grid grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <li key={i} className="rounded-2xl border-1 border-[#DBDAE199] px-4 py-5">
                        <div className="relative mb-8 h-16 w-full">
                            <Image fill src={`/assets/images/app/${card.imageTwo}.svg`} alt="Large Resort" className="rounded-sm object-cover" />
                            <Image className="-bottom-5 absolute left-5" width={60} height={60} src={`/assets/images/app/${card.imageOne}.svg`} alt="Small Resort" />
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <div className="flex flex-col gap-1">
                                <p className="font-medium">{card.title}</p>
                                <p className="text-neutral-500 text-xs">{card.description}</p>
                            </div>
                            <p className="font-semibold text-lg">${card.price}</p>
                            <div className="flex items-center gap-1">
                                <Mail className="size-2.5" />
                                <p className="text-xs">venueemail@example.com</p>
                            </div>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <Star key={idx} className="size-4 fill-orange-500/70 stroke-0" />
                                ))}
                                <p className="font-medium text-xs">4.9 (128)</p>
                            </div>
                            <Button className="w-full rounded-3xl border border-neutral-100 bg-white py-1 text-black text-xs">
                                <X />
                                <p>Remove</p>
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const cards = [
    { imageOne: "mountain-view-resort", imageTwo: "mountain-view-resort-2", title: "Mountain View Resort & Parks", description: "Venue", price: 5000 },
    { imageOne: "mountain-view-resort", imageTwo: "mountain-view-resort-2", title: "Mountain View Resort & Parks", description: "Venue", price: 5000 },
    { imageOne: "mountain-view-resort", imageTwo: "mountain-view-resort-2", title: "Mountain View Resort & Parks", description: "Venue", price: 5000 },
    { imageOne: "mountain-view-resort", imageTwo: "mountain-view-resort-2", title: "Mountain View Resort & Parks", description: "Venue", price: 5000 },
    { imageOne: "mountain-view-resort", imageTwo: "mountain-view-resort-2", title: "Mountain View Resort & Parks", description: "Venue", price: 5000 },
    { imageOne: "mountain-view-resort", imageTwo: "mountain-view-resort-2", title: "Mountain View Resort & Parks", description: "Venue", price: 5000 },
    { imageOne: "mountain-view-resort", imageTwo: "mountain-view-resort-2", title: "Mountain View Resort & Parks", description: "Venue", price: 5000 },
    { imageOne: "mountain-view-resort", imageTwo: "mountain-view-resort-2", title: "Mountain View Resort & Parks", description: "Venue", price: 5000 },
];
