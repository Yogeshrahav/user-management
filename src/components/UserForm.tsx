import React, { useState, useEffect } from "react";
import { User } from "../types";

interface UserFormProps {
  userToEdit?: User | null;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ userToEdit, onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setRole(userToEdit.role);
    } else {
      setName("");
      setEmail("");
      setRole("");
    }
  }, [userToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: userToEdit?.id || Date.now(),
      name,
      email,
      role,
    };
    onSave(newUser);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>{userToEdit ? "Edit User" : "Add User"}</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <button type="submit">{userToEdit ? "Update" : "Add"}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserForm;
