"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

const categories = ["Wallet Ledger", "Bills & Utilities", "Subscriptions", "Others"];

export default function CategorySearch({ onSelect }: { onSelect: (val: string) => void }) {
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (value: string) => {
        setQuery(value);

        if (!value.trim()) {
            setFiltered([]);
            return;
        }

        const matches = categories.filter((cat) => cat.toLowerCase().includes(value.toLowerCase()));
        setFiltered(matches);
    };

    const handleSelect = (value: string) => {
        onSelect(value);
        setQuery("");
        setFiltered([]);
    };

    const shouldShowDropdown = isFocused && query.trim().length > 0;

    return (
        <div className="relative w-full flex-1">
            {/* Search input */}
            <div className="flex items-center gap-2.5 rounded-4xl border bg-white px-4 transition-colors focus-within:border-[#437D8E]">
                <Input
                    value={query}
                    onChange={(e) => handleChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        // Delay to allow click on dropdown items before blur hides it
                        setTimeout(() => setIsFocused(false), 100);
                    }}
                    className="border-none px-0 font-normal text-black shadow-none outline-0 ring-0 placeholder:text-black focus-visible:ring-0"
                    placeholder="Search categories..."
                />
                <Search className="!w-5 !h-5 text-gray-500" />
            </div>
            {shouldShowDropdown && (
                <ul className="absolute top-full z-20 mt-2 w-full rounded-md border bg-white shadow-md">
                    {filtered.length > 0 ? (
                        filtered.map((cat) => (
                            <li
                                key={cat}
                                className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                                onMouseDown={() => handleSelect(cat)} // use onMouseDown instead of onClick
                            >
                                {cat}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-gray-500 text-sm">No suggestions.</li>
                    )}
                </ul>
            )}
        </div>
    );
}
