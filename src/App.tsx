import React, { useState } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import { User } from "./types";
import "./styles/App.css";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  const addUser = (user: User) => {
    if (userToEdit) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, user]);
    }
    setShowForm(false);
    setUserToEdit(null);
  };

  const editUser = (user: User) => {
    setUserToEdit(user);
    setShowForm(true);
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="app">
      <h1>User Management Dashboard</h1>
      {showForm ? (
        <UserForm
          userToEdit={userToEdit}
          onSave={addUser}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          <button onClick={() => setShowForm(true)}>Add User</button>
          <UserTable users={users} onEdit={editUser} onDelete={deleteUser} />
        </>
      )}
    </div>
  );
};

export default App;
