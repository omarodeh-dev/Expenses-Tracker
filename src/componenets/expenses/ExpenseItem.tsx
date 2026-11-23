import type {Expense} from "../../types/types";
import {toMonthly} from "../../utils/calculations";
import {formatDate, formatMoney, PERIOD_UNITS} from "../../utils/format";
import {PriorityBadge} from "../ui/PriorityBadge";

interface ExpenseItemProps {
    expense: Expense
}

export function ExpenseItem({expense}: ExpenseItemProps) {
    return (
        <li className="expense-item" data-id={expense.id}>
            <div className="expense-details">
                <div className="expense-title">
                    <strong>{expense.title}</strong>
                    <PriorityBadge priority={expense.priority} />
                </div>
                <div className="expense-amount">
                    {formatMoney(expense.amount)} {PERIOD_UNITS[expense.frequency]}
                    {expense.frequency === "yearly" && (
                        <span className="muted">
                            {" "}({formatMoney(toMonthly(expense.amount, expense.frequency))} {PERIOD_UNITS.monthly})
                        </span>
                    )}
                </div>
                <div className="muted">
                    Starts {formatDate(expense.date)}
                    {expense.category && ` · ${expense.category}`}
                </div>
                {expense.note && <div className="muted">{expense.note}</div>}
            </div>

            <div className="actions">
                <button type="button" data-action="edit">Edit</button>
                <button type="button" data-action="delete" className="btn-danger">Delete</button>
            </div>
        </li>
    )
}
