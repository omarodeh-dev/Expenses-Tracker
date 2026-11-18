import type { Frequency, UserTotals} from "../../types/types";
import { toYearly, toMonthly } from "../../utils/calculations";
import { formatMoney } from "../../utils/format";

interface SalarySummaryProps {
    summary : UserTotals
    period : Frequency
}

export function SalarySummary({summary , period} : SalarySummaryProps) {
    const salary = period === "monthly"
        ? toMonthly(summary.salary, period)
        : toYearly(summary.salary, period)
    const unit = period === "monthly" ? "/month" : "/year"


    return (
        <div>
            <div className="cards">
                <div className="card">
                    <span className="card-label">Salary</span>
                    <span className="card-value">{formatMoney(salary)}</span>
                    <span className="card-unit">{unit}</span>
                </div>
            </div>
        </div>
    )

}