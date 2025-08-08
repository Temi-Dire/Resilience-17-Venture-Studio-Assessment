// Ref: https://shadcn-country-dropdown.vercel.app/phone-input

"use client";
import { cn } from "@/client/lib/utils";
import { lookup } from "country-data-list";
import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js";
import { forwardRef, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { z } from "zod";
import { CountryDropdown } from "./country-dropdown";

export const phoneSchema = z.string().refine((value) => {
    try {
        return isValidPhoneNumber(value);
    } catch {
        return false;
    }
}, "Invalid phone number");

export type CountryData = {
    alpha2: string;
    alpha3: string;
    countryCallingCodes: string[];
    currencies: string[];
    emoji?: string;
    ioc: string;
    languages: string[];
    name: string;
    status: string;
};

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    onCountryChange?: (data: CountryData | undefined) => void;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    defaultCountry?: string;
    className?: string;
    inline?: boolean;
    countryData?: CountryData;
    setCountryData?: Dispatch<SetStateAction<CountryData | undefined>>;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(({ className, onCountryChange, onChange, value, placeholder, defaultCountry, countryData, setCountryData, inline = false, ...props }, ref) => {
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        if (defaultCountry) {
            const newCountryData = lookup.countries({
                alpha2: defaultCountry.toLowerCase(),
            })[0];
            setCountryData?.(newCountryData);

            if (!hasInitialized && newCountryData?.countryCallingCodes?.[0] && !value) {
                const syntheticEvent = {
                    target: {
                        value: newCountryData.countryCallingCodes[0],
                    },
                } as React.ChangeEvent<HTMLInputElement>;
                onChange?.(syntheticEvent);
                setHasInitialized(true);
            }
        }
    }, [defaultCountry, onChange, value, hasInitialized]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;

        // Ensure the value starts with "+"
        if (!newValue.startsWith("+")) {
            // Replace "00" at the start with "+" if present
            if (newValue.startsWith("00")) {
                newValue = `+ ${newValue.slice(2)}`;
            } else {
                // Otherwise just add "+" at the start
                newValue = `+ ${newValue}`;
            }
        }

        try {
            const parsed = parsePhoneNumber(newValue);
            if (parsed?.country) {
                // Update flag first
                const countryCode = parsed.country;

                // Force immediate update

                // Update other state
                const countryInfo = lookup.countries({ alpha2: countryCode })[0];
                setCountryData?.(countryInfo);
                onCountryChange?.(countryInfo);

                // Update input value
                const syntheticEvent = {
                    ...e,
                    target: {
                        ...e.target,
                        value: parsed.number,
                    },
                } as React.ChangeEvent<HTMLInputElement>;
                onChange?.(syntheticEvent);
            } else {
                onChange?.(e);
                setCountryData?.(undefined);
                onCountryChange?.(undefined);
            }
        } catch (error) {
            console.error("Error parsing phone number:", error);
            onChange?.(e);
            setCountryData?.(undefined);
            onCountryChange?.(undefined);
        }
    };

    const inputClasses = cn(
        "relative flex h-9 items-center gap-2 rounded-md border border-input bg-transparent pl-3 text-base shadow-sm transition-colors [interpolate-size:allow-keywords] disabled:cursor-not-allowed disabled:opacity-50 has-[input:focus]:outline-none has-[input:focus]:ring-1 has-[input:focus]:ring-ring md:text-sm",
        inline && "w-full rounded-l-none",
        className
    );

    return (
        <div className={inputClasses}>
            <CountryDropdown
                placeholder="Select country"
                defaultValue={countryData?.alpha3}
                onChange={(data) => {
                    setCountryData?.(data);
                }}
                slim
                countryCode
            />
            <input
                ref={ref}
                value={value}
                onChange={handlePhoneChange}
                placeholder={placeholder || "Enter number"}
                type="tel"
                autoComplete="tel"
                name="phone"
                className={cn("flex h-9 w-full border-none bg-transparent p-0 py-1 text-base leading-none outline-none transition-colors [interpolate-size:allow-keywords] placeholder:text-muted-foreground md:text-sm", className)}
                {...props}
            />
        </div>
    );
});

PhoneInput.displayName = "PhoneInput";
