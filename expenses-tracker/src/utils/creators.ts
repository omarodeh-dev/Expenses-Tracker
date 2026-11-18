import type {Expense, NewExpense, NewUser, User} from "../types/types";

//use crypto.randomUUID() , since there is no database to make a unique id for each user and expense,
//  we will use this function to generate a unique id for each user and expense

export function createUser(input:NewUser): User {
    return {...input, id: crypto.randomUUID()};
}

export function createExpense(input:NewExpense): Expense {
    return {...input, id: crypto.randomUUID()};
}