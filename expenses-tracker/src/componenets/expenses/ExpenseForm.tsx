import {useId, useState, type FormEvent} from "react";
import {useApp} from "../../hooks/useApp";
import {FREQUENCY, PRIORITY, type Expense, type Frequency, type Priority} from "../../types/types";
import {createExpense} from "../../utils/creators";
import {FREQUENCY_LABELS, PRIORITY_LABELS} from "../../utils/format";
import {isFrequency, isPriority} from "../../utils/guards";

interface ExpenseFormProps {
    userId: string
    // when passed, the form edits this expense instead of adding a new one
    expense?: Expense
    onDone?: () => void
}

type FormField = "title" | "amount" | "priority" | "frequency" | "date"
type FormErrors = Partial<Record<FormField, string>>

// en-CA formats dates as YYYY-MM-DD, which is what a date input expects
function getToday(): string {
    return new Date().toLocaleDateString("en-CA")
}
export function ExpenseForm({userId, expense, onDone}: ExpenseFormProps) {
    const {dispatch} = useApp()

    const [title, setTitle] = useState(expense?.title ?? "")
    const [amount, setAmount] = useState(expense ? String(expense.amount) : "")
    const [priority, setPriority] = useState<Priority | "">(expense?.priority ?? "")
    const [frequency, setFrequency] = useState<Frequency | "">(expense?.frequency ?? "")
    const [date, setDate] = useState(expense?.date ?? getToday())
    const [category, setCategory] = useState(expense?.category ?? "")
    const [note, setNote] = useState(expense?.note ?? "")
    const [errors, setErrors] = useState<FormErrors>({})

    const id = useId()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const amountNumber = Number(amount)
        const newErrors: FormErrors = {}

        if (!title) newErrors.title = "Title is required"
        if (amountNumber <= 0) newErrors.amount = "Amount must be greater than 0"
        if (!priority) newErrors.priority = "Please select a priority"
        if (!frequency) newErrors.frequency = "Please select a frequency"
        if (!date) newErrors.date = "Please select a date"

        setErrors(newErrors)
        if (!priority || !frequency || Object.keys(newErrors).length > 0) {
            return
        }

        const fields = {
            title,
            amount: amountNumber,
            priority,
            frequency,
            date,
            userId,
            category: category|| undefined,
            note: note || undefined,
        }

        if (expense) {
            dispatch({type: "UPDATE_EXPENSE", payload: {...fields, id: expense.id}})
        } else {
            dispatch({type: "ADD_EXPENSE", payload: createExpense(fields)})
            setTitle("")
            setAmount("")
            setPriority("")
            setFrequency("")
            setDate(getToday())
            setCategory("")
            setNote("")
        }

        onDone?.()
    }

    return (
        <form onSubmit={handleSubmit} className="form" noValidate>
            <label htmlFor={`${id}-title`}>Title</label>
            <input
                id={`${id}-title`}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="error">{errors.title}</p>}

            <label htmlFor={`${id}-amount`}>Amount</label>
            <input
                id={`${id}-amount`}
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            {errors.amount && <p className="error">{errors.amount}</p>}

            <label htmlFor={`${id}-priority`}>Priority</label>
            <select
                id={`${id}-priority`}
                value={priority}
                onChange={(e) => {
                    const value = e.target.value
                    setPriority(isPriority(value) ? value : "")
                }}
            >
                <option value="">Select priority</option>
                {PRIORITY.map(p => (
                    <option key={p} value={p}>
                        {PRIORITY_LABELS[p]}
                    </option>
                ))}
            </select>
            {errors.priority && <p className="error">{errors.priority}</p>}

            <label htmlFor={`${id}-frequency`}>Frequency</label>
            <select
                id={`${id}-frequency`}
                value={frequency}
                onChange={(e) => {
                    const value = e.target.value
                    setFrequency(isFrequency(value) ? value : "")
                }}
            >
                <option value="">Select frequency</option>
                {FREQUENCY.map(f => (
                    <option key={f} value={f}>
                        {FREQUENCY_LABELS[f]}
                    </option>
                ))}
            </select>
            {errors.frequency && <p className="error">{errors.frequency}</p>}

            <label htmlFor={`${id}-date`}>Start date</label>
            <input
                id={`${id}-date`}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <p className="error">{errors.date}</p>}

            <label htmlFor={`${id}-category`}>Category (optional)</label>
            <input
                id={`${id}-category`}
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <label htmlFor={`${id}-note`}>Note (optional)</label>
            <textarea
                id={`${id}-note`}
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />

            <button type="submit">{expense ? "Save Changes" : "Add Expense"}</button>
            {expense && <button type="button" onClick={onDone}>Cancel</button>}
        </form>
    )
}
