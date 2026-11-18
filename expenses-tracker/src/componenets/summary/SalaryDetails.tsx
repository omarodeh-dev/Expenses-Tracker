import type { Frequency, UserTotals} from "../../types/types";
import { monthlyToPeriod } from "../../utils/calculations";
import { formatMoney, PERIOD_UNITS } from "../../utils/format";

interface SalarySummaryProps {
    summary : UserTotals
    period : Frequency
}

export function SalarySummary({summary , period} : SalarySummaryProps) {
    const salary = monthlyToPeriod(summary.salary, period)
    const expenses = monthlyToPeriod(summary.totalExpenses, period)
    const remaining = monthlyToPeriod(summary.remaining, period)
    const unit = PERIOD_UNITS[period]


    return (
        <div>
            <div className="cards">
                <div className="card">
                    <span className="card-label">Salary</span>
                    <span className="card-value">{formatMoney(salary)}</span>
                    <span className="card-unit">{unit}</span>
                </div>
                <div className="card">
                    <span className="card-label">Expenses</span>
                    <span className="card-value">{formatMoney(expenses)}</span>
                    <span className="card-unit">{unit}</span>
                </div>
                <div className={summary.isOverBudget ? "card card-negative" : "card"}>
                    <span className="card-label">Remaining</span>
                    <span className="card-value">{formatMoney(remaining)}</span>
                    <span className="card-unit">{unit}</span>
                </div>
            </div>

            {summary.isOverBudget && (
                <p className="warning" role="alert">
                    Your expenses exceed your salary by {formatMoney(Math.abs(remaining))} {unit}.
                </p>
            )}
        </div>
    )

}
