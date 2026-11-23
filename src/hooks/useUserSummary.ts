import { useMemo } from "react";
import type { UserTotals } from "../types/types";
import { getUserTotals } from "../utils/calculations";
import { useApp } from "./useApp";

export function useUserSummary(): UserTotals | null {
    const {state} = useApp()
    const user = state.users.find(u => u.id === state.selectedUserId)


    return useMemo(
        () => (user ? getUserTotals(user,state.expenses) : null),
        [user, state.expenses]
    )
}