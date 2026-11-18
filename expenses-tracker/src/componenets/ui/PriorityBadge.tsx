import type { Priority } from "../../types/types";
import { PRIORITY_LABELS } from "../../utils/format";

export function PriorityBadge({ priority} : {priority : Priority}) {
    return <span className={`badge badge-${priority}`}>{PRIORITY_LABELS[priority]}</span>
}