import type {Expense,Frequency,PriorityTotals,User,UserTotals} from "../types/types";

const MONTHS_IN_YEAR = 12;
const WEEKS_IN_MONTH = 4.34524;
const DAYS_IN_MONTH = 30;


//count each expense monthly
export function toMonthly(amount: number, frequency: Frequency): number {
    switch (frequency) {
        case "daily":
            return amount * DAYS_IN_MONTH;
        case "weekly":
            return amount * WEEKS_IN_MONTH;
        case "monthly":
            return amount;
        case "yearly":
            return amount / MONTHS_IN_YEAR;
        default:
            throw new Error(`Unhandled frequency: ${frequency}`);
    }
}

export function toYearly(amount:number, frequency:Frequency):number {
    switch(frequency) {
        case "daily":
            return amount * DAYS_IN_MONTH * MONTHS_IN_YEAR;
        case "weekly" :
            return amount * WEEKS_IN_MONTH * MONTHS_IN_YEAR;
        case "monthly" :
            return amount * MONTHS_IN_YEAR;
        case "yearly" :
            return amount;
        default :
        throw new Error(`Unhandled frequency : ${frequency}`);
    }
}
//filter expenses by userId
export function  getUserExpenses(expenses: Expense[], userId: string): Expense[] {
    return expenses.filter(expense => expense.userId === userId);
}
//count total expenses for a month
export function getMonthlyTotal(expenses: Expense[]): number {
    return expenses.reduce((total, expense) => {
        const monthlyAmount = toMonthly(expense.amount, expense.frequency);
        return total + monthlyAmount;
    }, 0);
}
//filter by priority and count total expenses for each priority type
export function getPriorityTotals(expenses: Expense[]): PriorityTotals {
    const priorityTotals: PriorityTotals = {
        low: 0,
        medium: 0,
        high: 0,
    }
    for(const e of expenses){
        priorityTotals[e.priority] += toMonthly(e.amount, e.frequency);
    }
    return priorityTotals;
}

//summarize user expenses
export function getUserTotals(user: User, expenses: Expense[]): UserTotals {
    const userExpenses = getUserExpenses(expenses, user.id);
    const totalExpenses = getMonthlyTotal(userExpenses);
    const remaining = user.salary - totalExpenses;
    const priorityTotals = getPriorityTotals(userExpenses);
    return {
        salary : user.salary,
        remaining,
        userId: user.id,
        totalExpenses,
        byPriority : priorityTotals,
        isOverBudget: remaining < 0,
    }
}