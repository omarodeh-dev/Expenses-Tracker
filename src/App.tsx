import { ExpenseForm } from "./componenets/expenses/ExpenseForm";
import { ExpenseList } from "./componenets/expenses/ExpenseList";
import { Summary } from "./componenets/summary/Summary";
import { UserForm } from "./componenets/users/UserForm";
import { UserList } from "./componenets/users/UserList";
import { useApp } from "./hooks/useApp";


function App() {
  const {state} = useApp()
  const selectedUser = state.users.find(user => user.id === state.selectedUserId)

  return (
    <main className ="app">
      <header className="app-header">
        <h1>Expenses Tracker</h1>
        <p className={selectedUser ? "status status-active" : "status"}>
          {selectedUser ? `Selected user: ${selectedUser.name}` : "No user selected"}
        </p>
      </header>

      <div className="layout">
        <section className="panel">
          <h2>Add User</h2>
          <UserForm />
        </section>

        <section className="panel">
          <h2>Users</h2>
          <UserList />
        </section>

        {selectedUser && (
          <>
            <section className="panel panel-wide">
              <h2>Summary</h2>
              <Summary />
            </section>

            <section className="panel">
              <h2>Add Expense</h2>
              <ExpenseForm key={selectedUser.id} userId={selectedUser.id} />
            </section>

            <section className="panel">
              <h2>Expenses</h2>
              <ExpenseList key={selectedUser.id} userId={selectedUser.id} />
            </section>
          </>
        )}
      </div>
    </main>
  )
}

export default App
