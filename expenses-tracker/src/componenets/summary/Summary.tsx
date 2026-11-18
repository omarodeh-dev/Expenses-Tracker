import { useState } from "react";
import { useUserSummary } from "../../hooks/useUserSummary";
import { FREQUENCY, type Frequency } from "../../types/types";
import { FREQUENCY_LABELS } from "../../utils/format";
import { PriorityBadge } from "../ui/PriorityBadge";
import { SalarySummary } from "./SalaryDetails";
//import { PriorityBreakdown } from './PriorityBreakdown'
//import { SalarySummary } from './SalarySummary

export function Summary() {
    const summary = useUserSummary()
    const [period , setPeriod] = useState<Frequency>("monthly")

    if(summary === null) {
        return null
    }

    return (
        <div className="summary">
            <div className="toggle">
                {FREQUENCY.map(f => (
                    <button key={f} type="button" disabled={f===period} onClick={() => setPeriod(f)}>
                        {FREQUENCY_LABELS[f]}
                    </button>
                ))}
            </div>

            <SalarySummary summary ={summary} period={period} />

            <h3>By Priority</h3>
            <PriorityBreakdown byPriority ={summary.byPriority} period={period}/>
        </div>
    )
}