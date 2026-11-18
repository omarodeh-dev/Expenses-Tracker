import { UserForm } from "./componenets/users/UserForm";
import { UserList } from "./componenets/users/UserList";
import { useApp } from "./hooks/useApp";


function App() {
  const {state} = useApp()
  const selectedUser = state.users.find(user => user.id === state.selectedUserId)

  return (
    <main className ="app">
      <h1>Expenses Tracker</h1>

      <p>{selectedUser ? `Selected user: ${selectedUser.name}` : "No user selected"}</p>

      <section>
        <h2>Add User</h2>
        <UserForm />
      </section>

      <section>
        <h2>Users</h2>
        <UserList />
      </section>
    </main>
  )
}

export default App