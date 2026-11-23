import { PRIORITY, type Frequency, type PriorityTotals } from "../../types/types";
import { monthlyToPeriod } from "../../utils/calculations";
import { formatMoney, PERIOD_UNITS } from "../../utils/format";
import { PriorityBadge } from "../ui/PriorityBadge";

interface PriorityBreakdownProps {
    byPriority : PriorityTotals
    period : Frequency
}

export function PriorityBreakdown({byPriority , period} : PriorityBreakdownProps) {
    const total = PRIORITY.reduce((sum, p) => sum + byPriority[p], 0)

    return (
        <ul className="priority-list">
            {PRIORITY.map(p => {
                const share = total > 0 ? Math.round((byPriority[p] / total) * 100) : 0

                return (
                    <li key={p} className="priority-item">
                        <PriorityBadge priority={p} />
                        <span className="priority-amount">
                            {formatMoney(monthlyToPeriod(byPriority[p], period))} {PERIOD_UNITS[period]}
                        </span>
                        <span className="muted">{share}%</span>
                        <span className={`meter meter-${p}`} aria-hidden="true">
                            <span style={{width: `${share}%`}} />
                        </span>
                    </li>
                )
            })}
        </ul>
    )
}
