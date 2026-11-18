import type { Frequency, Priority, SortOption } from "../types/types";

export const PRIORITY_LABELS : Record<Priority,string> = {
    high : "High",
    medium : "Medium",
    low : "Low",
}

export const FREQUENCY_LABELS : Record<Frequency, string> = {
    daily : "Daily",
    weekly : "Weekly",
    monthly : "Monthly",
    yearly : "Yearly",
}

export const SORT_LABELS : Record<SortOption, string> = {
    default : "Order Added",
    "Amount-desc" : "Amount : High to Low",
    "Amount-Asc" : "Amount : Low to High",
    priority : "Priority"
}

export const CURRENCY = "JOD";

const moneyFormatter = new Intl.NumberFormat("undefined", {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const formatMoney = (amount: number) => {
    return moneyFormatter.format(amount);
};