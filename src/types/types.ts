// Ordered from most to least important, so lists and the priority sort show "high" first
export const PRIORITY = ["high", "medium", "low"] as const;
export type Priority = (typeof PRIORITY)[number];

export const FREQUENCY = ["monthly", "yearly"] as const;
export type Frequency = (typeof FREQUENCY)[number];

export interface User {
    id:string;
    name:string;
    // the amount as the user entered it, read it together with salaryPeriod
    salary:number;
    salaryPeriod:Frequency;
}

export interface Expense {
    id:string;
    title:string;
    amount:number;
    priority:Priority;
    frequency:Frequency;
    // start date in YYYY-MM-DD format
    date:string;
    userId:string;
    category?:string;
    note?:string;
}

export type NewUser = Omit<User, "id">;

export type NewExpense = Omit<Expense, "id">;


export interface AppState {
    users: User[];
    expenses: Expense[];
    selectedUserId: string | null;
}

export const SORT_OPTIONS = ["default","amount-desc","amount-asc","priority"] as const
export type SortOption = (typeof SORT_OPTIONS)[number]

export const USER_ACTIONS = ["select", "edit", "delete"] as const
export type UserAction = (typeof USER_ACTIONS)[number]

export const EXPENSE_ACTIONS = ["edit", "delete"] as const
export type ExpenseAction = (typeof EXPENSE_ACTIONS)[number]

export interface ExpenseFilter {
    priority: Priority | "all"
    frequency: Frequency | "all"
    sortBy: SortOption
}


export type PriorityTotals = Record<Priority, number>;

export interface UserTotals {
    salary : number;
    remaining : number;
    userId: string;
    totalExpenses: number;
    byPriority: PriorityTotals;
    isOverBudget: boolean;
}
