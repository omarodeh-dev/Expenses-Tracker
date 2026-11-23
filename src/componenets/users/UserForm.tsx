import {useId, useState, type FormEvent} from "react";
import {useApp} from "../../hooks/useApp";
import {FREQUENCY, type Frequency, type User} from "../../types/types";
import {createUser} from "../../utils/creators";
import {FREQUENCY_LABELS} from "../../utils/format";
import {isFrequency} from "../../utils/guards";

interface UserFormProps {
    // when passed, the form edits this user instead of adding a new one
    user?: User;
    onDone?: () => void;
}

export function UserForm({user, onDone}: UserFormProps) {

    const {dispatch} = useApp();


    const [name, setName] = useState(user?.name ?? "");
    const [salary, setSalary] = useState(user ? String(user.salary) : "");
    const [salaryPeriod, setSalaryPeriod] = useState<Frequency>(user?.salaryPeriod ?? "monthly");
    const [errors, setErrors] = useState<{name?: string; salary?: string}>({});

    const nameId = useId();
    const salaryId = useId();
    const periodId = useId();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const salaryNumber = Number(salary);
        const newErrors: {name?: string; salary?: string} = {};

        if (salaryNumber <= 0) {
            newErrors.salary = "Salary must be greater than 0";
        }

        setErrors(newErrors);
        if (newErrors.name || newErrors.salary) {
            return;
        }

        const fields = {name, salary: salaryNumber, salaryPeriod};

        if (user) {
            dispatch({type: "UPDATE_USER", payload: {...fields, id: user.id}});
        } else {
            dispatch({type: "ADD_USER", payload: createUser(fields)});
            setName("");
            setSalary("");
            setSalaryPeriod("monthly");
        }

        onDone?.();
    }

    return (
        <form onSubmit={handleSubmit} className="form" noValidate>
            <label htmlFor={nameId}>Name:</label>
            <input
                id={nameId}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <label htmlFor={salaryId}>Salary:</label>
            <input
                id={salaryId}
                type="number"

                value={salary}
                onChange={(e) => setSalary(e.target.value)}
            />
            {errors.salary && <p className="error">{errors.salary}</p>}

            <label htmlFor={periodId}>Salary period:</label>
            <select
                id={periodId}
                value={salaryPeriod}
                onChange={(e) => {
                    const value = e.target.value;
                    setSalaryPeriod(isFrequency(value) ? value : "monthly");
                }}
            >
                {FREQUENCY.map(f => (
                    <option key={f} value={f}>
                        {FREQUENCY_LABELS[f]}
                    </option>
                ))}
            </select>

            <button type="submit">{user ? "Save Changes" : "Add User"}</button>
            {user && <button type="button" onClick={onDone}>Cancel</button>}
        </form>
    );
}
