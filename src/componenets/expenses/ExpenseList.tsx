import {useState, type MouseEvent} from "react";
import {useApp} from "../../hooks/useApp";
import type {ExpenseFilter} from "../../types/types";
import {getUserExpenses} from "../../utils/calculations";
import {getDelegatedClick} from "../../utils/delegation";
import {applyFilters, DEFAULT_FILTERS} from "../../utils/expenseFilters";
import {isExpenseAction} from "../../utils/guards";
import {ExpenseForm} from "./ExpenseForm";
import {ExpenseItem} from "./ExpenseItem";
import {ExpenseFilterBar} from "./ExpensesFilterBar";

export function ExpenseList({userId}: {userId: string}) {
    const {state, dispatch} = useApp()
    const [filters, setFilters] = useState<ExpenseFilter>(DEFAULT_FILTERS)
    const [editingId, setEditingId] = useState<string | null>(null)

    function handleListClick(e: MouseEvent<HTMLUListElement>) {
        const click = getDelegatedClick(e)
        if (!click) return
        const {action, id} = click

        if (!isExpenseAction(action)) {
            console.warn(`Unknown expense action: ${action}`)
            return
        }

        switch (action) {
            case "edit":
                setEditingId(id)
                break
            case "delete":
                dispatch({type: "DELETE_EXPENSE", payload: {id}})
                break
        }
    }

    const userExpenses = getUserExpenses(state.expenses, userId)

    if (userExpenses.length === 0) {
        return <p className="empty">No expenses yet. Add your first expense using the form.</p>
    }

    const visibleExpenses = applyFilters(userExpenses, filters)

    return (
        <div>
            <ExpenseFilterBar filters={filters} onChange={setFilters} />

            {visibleExpenses.length === 0 ? (
                <p className="empty">No expenses match these filters.</p>
            ) : (
                <ul className="expense-list" onClick={handleListClick}>
                    {visibleExpenses.map(expense =>
                        expense.id === editingId ? (
                            <li key={expense.id} className="expense-item">
                                <ExpenseForm
                                    userId={userId}
                                    expense={expense}
                                    onDone={() => setEditingId(null)}
                                />
                            </li>
                        ) : (
                            <ExpenseItem key={expense.id} expense={expense} />
                        ),
                    )}
                </ul>
            )}
        </div>
    )
}
