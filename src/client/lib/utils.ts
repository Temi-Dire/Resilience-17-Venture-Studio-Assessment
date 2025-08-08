import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatNumberWithCommas(num: number | string): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatCurrency(amount: number, currencySymbol = "$") {
    const absAmount = Math.abs(amount).toLocaleString();
    return amount < 0 
      ? `-${currencySymbol}${absAmount}` 
      : `${currencySymbol}${absAmount}`;
  }

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
