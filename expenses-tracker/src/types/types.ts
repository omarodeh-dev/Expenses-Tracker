export const PRIORITY = ["low", "medium", "high"] as const;
export type Priority = (typeof PRIORITY)[number];

export const FREQUENCY = ["daily", "weekly", "monthly", "yearly"] as const;
export type Frequency = (typeof FREQUENCY)[number];

export interface User {
    id:string;
    name:string;
    salary:number;
}

export interface Expense {
    id:string;
    name:string;
    amount:number;
    priority:Priority;
    frequency:Frequency;
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

export const SORT_OPTIONS = ["default","Amount-desc","Amount-Asc","priority"] as const
export type SortOption = (typeof SORT_OPTIONS)[number]

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
