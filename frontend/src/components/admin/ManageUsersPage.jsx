import { useState } from "react";
import UserList from "../../components/user/UserList.jsx";
import AddUserForm from "../../components/user/AddUserForm.jsx";
import EditUserForm from "../../components/user/EditUserForm.jsx";

function ManageUsersPage() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [],
  );
  const [editingUser, setEditingUser] = useState(null);

  const handleCreateUser = (user) => {
    const updated = [...users, user];
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const handleDeleteUser = (id) => {
    const updated = users.filter((u) => u.usuario !== id);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const handleUpdateUser = (updatedUser) => {
    const updated = users.map((u) =>
      u.usuario === updatedUser.usuario ? updatedUser : u,
    );
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    setEditingUser(null);
  };

  return (
    <div className="manage-users">
      <h1>Gestión de Usuarios</h1>

      <UserList
        users={users}
        onEdit={(user) => setEditingUser(user)}
        onDelete={handleDeleteUser}
      />

      {editingUser ? (
        <EditUserForm
          user={editingUser}
          onSubmit={handleUpdateUser}
          isAdminContext={true}
        />
      ) : (
        <AddUserForm onSubmit={handleCreateUser} isAdminContext={true} />
      )}
    </div>
  );
}

export default ManageUsersPage;
