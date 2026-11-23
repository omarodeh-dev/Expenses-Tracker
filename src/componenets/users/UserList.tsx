import {useState, type MouseEvent} from "react";
import {useApp} from "../../hooks/useApp.ts";
import {toMonthly} from "../../utils/calculations.ts";
import {getDelegatedClick} from "../../utils/delegation.ts";
import {formatMoney, PERIOD_UNITS} from "../../utils/format.ts";
import {isUserAction} from "../../utils/guards.ts";
import {UserForm} from "./UserForm.tsx";

export function UserList() {
    const {state , dispatch} = useApp()
    const {users , selectedUserId} = state
    const [editingId, setEditingId] = useState<string | null>(null)

    function handleDelete(id: string) {
        const user = users.find(u => u.id === id)
        if (!user) return
        if (window.confirm(`Delete ${user.name} and all of their expenses?`)) {
            dispatch({type: "DELETE_USER", payload: {id}})
        }
    }

    function handleListClick(e: MouseEvent<HTMLUListElement>) {
        const click = getDelegatedClick(e)
        if (!click) return
        const {action, id} = click

        if (!isUserAction(action)) {
            console.warn(`Unknown user action: ${action}`)
            return
        }

        switch (action) {
            case "select":
                dispatch({type: "SELECT_USER", payload: {id}})
                break
            case "edit":
                setEditingId(id)
                break
            case "delete":
                handleDelete(id)
                break
        }
    }

    if(users.length === 0) {
        return <p className="empty">No users found. Please add a user.</p>
    }

    return (
        <ul className="user-list" onClick={handleListClick}>
            {users.map((user) => {
                const isSelected = user.id === selectedUserId
                const itemClass = isSelected ? "user-item selected" : "user-item"

                if (user.id === editingId) {
                    return (
                        <li key={user.id} className={itemClass}>
                            <UserForm user={user} onDone={() => setEditingId(null)} />
                        </li>
                    )
                }

                return (
                    <li key={user.id} data-id={user.id} className={itemClass}>
                        <div className="user-info">
                            <span className="user-name">{user.name}</span>
                            <span className="muted">
                                {formatMoney(user.salary)} {PERIOD_UNITS[user.salaryPeriod]}
                                {user.salaryPeriod === "yearly" && (
                                    <>
                                        {" "}({formatMoney(toMonthly(user.salary, user.salaryPeriod))} {PERIOD_UNITS.monthly})
                                    </>
                                )}
                            </span>
                        </div>
                        <div className="actions">
                            <button type="button" data-action="select" disabled={isSelected}>
                                {isSelected ? "Selected" : "Select"}
                            </button>
                            <button type="button" data-action="edit">Edit</button>
                            <button type="button" data-action="delete" className="btn-danger">Delete</button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
