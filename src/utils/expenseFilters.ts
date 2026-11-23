import { PRIORITY, type Expense, type ExpenseFilter } from "../types/types";
import { toMonthly } from "./calculations";

export const DEFAULT_FILTERS : ExpenseFilter = {
    priority : "all",
    frequency : "all",
    sortBy : "default",
}

function monthlyCost(expense: Expense): number {
    return toMonthly(expense.amount, expense.frequency)
}

export function applyFilters(expense : Expense[], filters : ExpenseFilter): Expense[] {
    const filtered = expense.filter(e => 
    (filters.priority === "all" || e.priority === filters.priority) &&
    (filters.frequency === "all" || e.frequency === filters.frequency),
    )

    switch(filters.sortBy) {
        case "Amount-desc" :
            return filtered.toSorted((a,b) => monthlyCost(b) - monthlyCost(a))
        case "Amount-Asc" :
            return filtered.toSorted((a,b) => monthlyCost(a) - monthlyCost(b))
        case "priority" :
            return filtered.toSorted(
                (a,b) => PRIORITY.indexOf(a.priority) - PRIORITY.indexOf(b.priority),
            )
        case "default" :
            return filtered
    }
}