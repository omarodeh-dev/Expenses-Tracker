import type {AppState, Expense, User} from "../types/types";
import {isFrequency, isPriority} from "./guards";


export const STORAGE_KEY = "expenses-tracker:state";

interface StoredState {
    data: AppState;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function isValidNumber(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value);
}

function isUser(value: unknown): value is User {
    return isRecord(value)
        && typeof value.id === "string"
        && typeof value.name === "string"
        && isValidNumber(value.salary)
        && isFrequency(value.salaryPeriod);
}

function isExpense(value: unknown): value is Expense {
    return isRecord(value)
        && typeof value.id === "string"
        && typeof value.title === "string"
        && isValidNumber(value.amount)
        && isPriority(value.priority)
        && isFrequency(value.frequency)
        && typeof value.date === "string"
        && typeof value.userId === "string"
        && (value.category === undefined || typeof value.category === "string")
        && (value.note === undefined || typeof value.note === "string");
}


export function parseStoredState(raw: string | null): AppState | null {
    if (raw === null) return null;

    let parsed: unknown;
    try {
        parsed = JSON.parse(raw);
    } catch {
        return null;
    }

    if (!isRecord(parsed) || !isRecord(parsed.data)) {
        return null;
    }

    const {users, expenses, selectedUserId} = parsed.data;
    if (!Array.isArray(users) || !Array.isArray(expenses)) return null;

    const validUsers = users.filter(isUser);
    const userIds = new Set(validUsers.map(user => user.id));
    const validExpenses = expenses.filter(isExpense).filter(expense => userIds.has(expense.userId));

    return {
        users: validUsers,
        expenses: validExpenses,
        selectedUserId: typeof selectedUserId === "string" && userIds.has(selectedUserId)
            ? selectedUserId
            : null,
    };
}

export function loadState(fallback: AppState): AppState {
    try {
        return parseStoredState(localStorage.getItem(STORAGE_KEY)) ?? fallback;
    } catch {
        return fallback;
    }
}

export function saveState(state: AppState): void {
    const stored: StoredState = {data: state};
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch (error) {
        console.warn("Could not save to localStorage:", error);
    }
}
