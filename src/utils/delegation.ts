import type {MouseEvent} from "react";

export interface DelegatedClick {
    action: string
    id: string
}

export function getDelegatedClick(e: MouseEvent<HTMLElement>): DelegatedClick | null {
    if (!(e.target instanceof Element)) return null

    const button = e.target.closest<HTMLButtonElement>("button[data-action]")
    if (!button || button.disabled || !e.currentTarget.contains(button)) return null

    const id = button.closest<HTMLLIElement>("li[data-id]")?.dataset.id
    const action = button.dataset.action
    if (!id || !action) return null

    return {action, id}
}
