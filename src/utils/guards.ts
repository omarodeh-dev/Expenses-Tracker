import {
    EXPENSE_ACTIONS,
    FREQUENCY,
    PRIORITY,
    SORT_OPTIONS,
    USER_ACTIONS,
    type ExpenseAction,
    type Frequency,
    type Priority,
    type SortOption,
    type UserAction,
} from "../types/types.ts";

export function isFrequency(value: unknown): value is Frequency {
    return FREQUENCY.some((freq) => freq === value);
}

export function isPriority(value: unknown): value is Priority {
    return PRIORITY.some((prio) => prio === value);
}

export function isSortOption(value:string): value is SortOption {
    return SORT_OPTIONS.some(s => s === value)
}

export function isUserAction(value: unknown): value is UserAction {
    return USER_ACTIONS.some((action) => action === value);
}

export function isExpenseAction(value: unknown): value is ExpenseAction {
    return EXPENSE_ACTIONS.some((action) => action === value);
}
