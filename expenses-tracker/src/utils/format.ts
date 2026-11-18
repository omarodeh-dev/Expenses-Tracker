import type { Frequency, Priority, SortOption } from "../types/types";

export const PRIORITY_LABELS : Record<Priority,string> = {
    high : "High",
    medium : "Medium",
    low : "Low",
}

export const FREQUENCY_LABELS : Record<Frequency, string> = {
    monthly : "Monthly",
    yearly : "Yearly",
}

export const PERIOD_UNITS : Record<Frequency, string> = {
    monthly : "/ month",
    yearly : "/ year",
}

export const SORT_LABELS : Record<SortOption, string> = {
    default : "Order Added",
    "Amount-desc" : "Amount : High to Low",
    "Amount-Asc" : "Amount : Low to High",
    priority : "Priority"
}

export const CURRENCY = "JOD";

const moneyFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {dateStyle: "medium"});

export const formatMoney = (amount: number) => {
    return moneyFormatter.format(amount);
};

// the time is added so the date is read in local time and can't shift by a day
export const formatDate = (date: string) => {
    return dateFormatter.format(new Date(`${date}T00:00:00`));
};
