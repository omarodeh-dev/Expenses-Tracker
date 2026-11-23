import {useId} from "react";
import {FREQUENCY, PRIORITY, SORT_OPTIONS, type ExpenseFilter} from "../../types/types";
import {FREQUENCY_LABELS, PRIORITY_LABELS, SORT_LABELS} from "../../utils/format";
import {isFrequency, isPriority, isSortOption} from "../../utils/guards";

interface ExpenseFilterBarProps {
    filters: ExpenseFilter
    onChange: (filters: ExpenseFilter) => void
}


export function ExpenseFilterBar({filters , onChange} : ExpenseFilterBarProps) {
    const id = useId()

    return (
        <div className="filters">
            <label htmlFor={`${id}-priority`}>Priority</label>
            <select
            id={`${id}-priority`}
            value={filters.priority}
            onChange={(e) => {
                const value = e.target.value
                onChange({...filters, priority : value ==="all" || isPriority(value) ? value : "all"})
            }}>
                <option value="all">All</option>
                {PRIORITY.map(p => (
                    <option key={p} value={p}>
                    {PRIORITY_LABELS[p]}
                    </option>
                ))}
            </select>
            <label htmlFor={`${id}-frequency`}>Frequency</label>
            <select
            id={`${id}-frequency`}
            value={filters.frequency}
            onChange={(e) => {
                const value = e.target.value
                onChange({...filters, frequency: value === "all" || isFrequency(value) ? value : "all"})
            }}
            >
                <option value="all">All</option>
                {FREQUENCY.map(f => (
                    <option key={f} value={f}>
                        {FREQUENCY_LABELS[f]}
                    </option>
                ))}
            </select>

            <label htmlFor={`${id}-sort`}>Sort by</label>
            <select
            id={`${id}-sort`}
            value={filters.sortBy}
            onChange={e => {
                const value = e.target.value
                onChange({...filters, sortBy: isSortOption(value) ? value : "default"})
            }}
            >
                {SORT_OPTIONS.map(s => (
                    <option key={s} value={s}>
                        {SORT_LABELS[s]}
                    </option>
                ))}
            </select>
        </div>
    )
}