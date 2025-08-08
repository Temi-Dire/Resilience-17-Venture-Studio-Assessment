import { ArrowLeft, Download, Sparkles } from "lucide-react";

import { Button } from "@/client/components/ui/button";
import { useState } from "react";
import { Overview } from "./overview";
import { Vendors } from "./vendors";
import { Tasks } from "./tasks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs";
import { ResponsiveContainer, Pie, Cell, PieChart } from "recharts";
import { cn } from "@/client/lib/utils";

type TabTypes = "Overview" | "Vendors" | "Tasks";

const Concept: React.FC<{ handleClick: () => void }> = ({ handleClick }) => {
    const [activeTab, setActiveTab] = useState<TabTypes>("Overview");
    return (
        <div className="mb-2.5 w-full bg-white px-15 py-5 pt-13">
            <div className="flex flex-col items-start gap-3.5">
                <Button className="flex cursor-pointer items-center gap-1.5 bg-white p-2.5 font-medium text-black text-xs shadow-none hover:bg-white" onClick={handleClick}>
                    <ArrowLeft className="size-3.5" />
                    <span>Back To Events Concept</span>
                </Button>
                <div className="flex w-full flex-1 items-center justify-between">
                    <div className="flex-[0.45]">
                        <h1 className="mb-3.5 font-medium text-xl">Coastal Elegance Wedding</h1>
                        <p className="mb-8 text-neutral-500 text-sm">A closer look at this concept—theme, vendors, budget, and more—all based on your original prompt.</p>
                        <div className="mb-8 flex gap-5">
                            <Button className="h-13 rounded-3xl border-[1.5px] border-black bg-white py-6 font-semibold text-black text-xs">
                                <p>Export Planning Guide</p>
                                <Download />
                            </Button>
                            <Button className="h-13 min-w-[9.9rem] rounded-3xl bg-gradient-to-r bg-white from-[#35AA91] to-[#358474] py-6 text-xs">
                                <p>Plan With AI</p>
                                <Sparkles />
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-[0.55] flex-col rounded-2xl border border-primary/5 bg-white p-6 md:flex-row md:items-center md:justify-between">
                        <div className="min-h-36 w-full flex-1/2 self-stretch md:w-1/2">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={data} dataKey="value" innerRadius="60%" outerRadius="80%" paddingAngle={2} startAngle={90} endAngle={-270}>
                                        {data.map((entry) => (
                                            <Cell key={entry.name} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    {/* center label */}
                                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="font-bold text-lg">
                                        ${total.toLocaleString()}
                                    </text>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-1/2 flex-col gap-6">
                            <ul className="flex flex-col gap-3">
                                {data.map((entry) => (
                                    <li key={entry.name} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <p className={cn("block size-2 flex-shrink-0 rounded-full")} style={{ backgroundColor: entry.color }} />
                                            <p>{entry.name}</p>
                                        </div>
                                        <p className="font-medium">${entry.value.toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-100 px-2 py-3 font-medium text-base">
                                <p className="text-sm">Total Budget:</p>
                                <p className="font-medium text-lg">${total.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabTypes)} className="w-full">
                <TabsList className="!py-0 grid grid h-8 w-[400px] grid-cols-3 bg-[#F9F9F9] text-sm">
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab} value={tab} className="!h-8 !py-0 flex items-center justify-center transition-colors data-[state=active]:rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="Overview" className="data-[state=inactive]:hidden data-[state=active]:flex-1">
                    <Overview />
                </TabsContent>

                <TabsContent value="Vendors" className="data-[state=inactive]:hidden data-[state=active]:flex-1">
                    <Vendors />
                </TabsContent>

                <TabsContent value="Tasks" className="data-[state=inactive]:hidden data-[state=active]:flex-1">
                    <Tasks />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Concept;

const tabs = ["Overview", "Vendors", "Tasks"];

const data = [
    { name: "Venue", value: 3500, color: "#FF7F7F" },
    { name: "Entertainment", value: 4200, color: "#8FCBFB" },
    { name: "Catering", value: 8500, color: "#BE90FF" },
    { name: "Decor", value: 2100, color: "#94EBA1" },
    { name: "Additional Costs", value: 1500, color: "#FFD56B" },
];

const total = data.reduce((sum, d) => sum + d.value, 0);
