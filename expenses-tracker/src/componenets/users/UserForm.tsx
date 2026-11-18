import {useId, useState, type FormEvent} from "react";
import {useApp} from "../../hooks/useApp";
import {createUser} from "../../utils/creators";

export function UserForm() {

    const {dispatch} = useApp();


    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");

    const nameId = useId();
    const salaryId = useId();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const salaryNumber = Number(salary);
        if (isNaN(salaryNumber) || salaryNumber <= 0) {
            alert("Please enter a valid salary");
            return;
        }

        dispatch({
            type: "ADD_USER",
            payload: createUser({name: name, salary: salaryNumber}),
        });

        setName("");
        setSalary("");
    }

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <label htmlFor={nameId}>Name:</label>
            <input
                id={nameId}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor={salaryId}>Salary:</label>
            <input
                id={salaryId}
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
            />
            <button type="submit">Add User</button>
        </form>
    );
}