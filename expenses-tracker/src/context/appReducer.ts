import type {AppState,Expense,User} from "../types/types";

export type Action =
    | { type: "ADD_USER"; payload: User }
    | { type: "ADD_EXPENSE"; payload: Expense }
    | { type: "SELECT_USER"; payload: {id:string | null} }
    | { type: "DELETE_USER"; payload: {id:string} }
    | { type: "DELETE_EXPENSE"; payload: {id:string} }
    | { type: "UPDATE_USER"; payload: User }
    | { type: "UPDATE_EXPENSE"; payload: Expense };


export const initialState: AppState = {
    users: [],
    expenses: [],
    selectedUserId: null,
};

export function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state,
                users: [...state.users, action.payload],
                selectedUserId: state.selectedUserId ?? action.payload.id,
            };
        case "SELECT_USER":
            return {
                ...state,
                selectedUserId: action.payload.id
            };

        case "UPDATE_USER":
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
            };
        case "DELETE_USER":
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload.id),
                expenses: state.expenses.filter(expense => expense.userId !== action.payload.id),
                selectedUserId: state.selectedUserId === action.payload.id ? null : state.selectedUserId
            };
        case "ADD_EXPENSE":
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            };
        case "UPDATE_EXPENSE":
            return {
                ...state,
                expenses: state.expenses.map(expense => expense.id === action.payload.id ? action.payload : expense)
            };
        case "DELETE_EXPENSE":
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
            };
        default:
            return assignNever(action);
    }
}

function assignNever(action: never): never {
    throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
}