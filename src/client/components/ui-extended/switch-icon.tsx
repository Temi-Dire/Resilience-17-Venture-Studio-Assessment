// Ref: https://github.com/shadcn-ui/ui/issues/3873#issuecomment-3048177050

"use client";

import type * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/client/lib/utils";

export interface SwitchWithIconProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
    checkedIcon?: React.ReactNode;
    uncheckedIcon?: React.ReactNode;
}

function SwitchWithIcon({ className, checkedIcon, uncheckedIcon, ...props }: SwitchWithIconProps) {
    const effectiveCheckedIcon = checkedIcon;
    const effectiveUncheckedIcon = uncheckedIcon;

    return (
        <SwitchPrimitive.Root
            data-slot="switch"
            className={cn(
                "group peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
                className
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                data-slot="switch-thumb"
                className={cn(
                    "pointer-events-none flex size-4 items-center justify-center rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"
                )}
            >
                <span data-slot="switch-thumb" className="hidden group-data-[state=checked]:inline dark:group-data-[state=checked]:text-background [&_svg]:size-3">
                    {effectiveCheckedIcon}
                </span>
                {effectiveUncheckedIcon && <span className="hidden group-data-[state=unchecked]:inline [&_svg]:size-3">{effectiveUncheckedIcon}</span>}
            </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
    );
}

export { SwitchWithIcon };
