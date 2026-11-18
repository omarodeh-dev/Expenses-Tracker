import {useApp} from "../../hooks/useApp.ts";
import {formatMoney} from "../../utils/format.ts";

export function UserList() {
    const {state , dispatch} = useApp()
    const {users , selectedUserId} = state

    if(users.length === 0) {
        return <p>No users found. Please add a user.</p>
    }

    return (
        <ul className="user-list">
            {users.map((user) => {
                const isSelected = user.id === selectedUserId

                return (
                    <li key={user.id} className={isSelected ? "user-item selected" : "user-item"}>
                        <span>
                            {user.name} - {formatMoney(user.salary)} / month
                        </span>
                        <button
                        type="button"
                        disabled={isSelected}
                        onClick={() => dispatch({type: "SELECT_USER", payload: {id: user.id}})}
                        >
                            {isSelected ? "Selected" : "Select"}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}