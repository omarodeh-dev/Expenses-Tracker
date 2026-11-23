import {FREQUENCY, PRIORITY, SORT_OPTIONS, type Frequency, type Priority, type SortOption} from "../types/types.ts";

export function isFrequency(value: unknown): value is Frequency {
    return FREQUENCY.some((freq) => freq === value);
}

export function isPriority(value: unknown): value is Priority {
    return PRIORITY.some((prio) => prio === value);
}

export function isSortOption(value:string): value is SortOption {
    return SORT_OPTIONS.some(s => s === value)
}
