import {useState} from "react";
import {useApp} from "../../hooks/useApp.ts";
import type {User} from "../../types/types.ts";
import {toMonthly} from "../../utils/calculations.ts";
import {formatMoney, PERIOD_UNITS} from "../../utils/format.ts";
import {UserForm} from "./UserForm.tsx";

export function UserList() {
    const {state , dispatch} = useApp()
    const {users , selectedUserId} = state
    const [editingId, setEditingId] = useState<string | null>(null)

    function handleDelete(user: User) {
        if (window.confirm(`Delete ${user.name} and all of their expenses?`)) {
            dispatch({type: "DELETE_USER", payload: {id: user.id}})
        }
    }

    if(users.length === 0) {
        return <p className="empty">No users found. Please add a user.</p>
    }

    return (
        <ul className="user-list">
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
                    <li key={user.id} className={itemClass}>
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
                            <button
                            type="button"
                            disabled={isSelected}
                            onClick={() => dispatch({type: "SELECT_USER", payload: {id: user.id}})}
                            >
                                {isSelected ? "Selected" : "Select"}
                            </button>
                            <button type="button" onClick={() => setEditingId(user.id)}>Edit</button>
                            <button type="button" className="btn-danger" onClick={() => handleDelete(user)}>Delete</button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
