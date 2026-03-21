import { useState } from "react";
import UserList from "../../components/user/UserList.jsx";
import AddUserForm from "../../components/user/AddUserForm.jsx";
import EditUserForm from "../../components/user/EditUserForm.jsx";
import BasicCard from "../../components/ui/BasicCard.jsx";

function ManageUsersPage({ mode = "all" }) {

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const [editingUser, setEditingUser] = useState(null);

  const handleCreateUser = (user) => {

    const updated = [...users, user];

    setUsers(updated);

    localStorage.setItem(
      "users",
      JSON.stringify(updated)
    );

    alert("Usuario creado");

  };

  const handleDeleteUser = (id) => {

    const ok =
      window.confirm(
        "¿Seguro que quieres borrar el usuario?"
      );

    if (!ok) return;

    const updated =
      users.filter(
        (u) => u.usuario !== id
      );

    setUsers(updated);

    localStorage.setItem(
      "users",
      JSON.stringify(updated)
    );

  };

  const handleUpdateUser = (user) => {

    const updated =
      users.map((u) =>
        u.usuario === user.usuario ? user : u
      );

    setUsers(updated);

    localStorage.setItem(
      "users",
      JSON.stringify(updated)
    );

    alert("Usuario actualizado");

    setEditingUser(null);

  };

  if (mode === "add") {

    return (

      <BasicCard titulo="Crear usuario">

        <AddUserForm

          onBack={() => {
            window.location.reload();
          }}

        />

      </BasicCard>

    );

  }


  if (editingUser) {

    return (

      <BasicCard titulo="Editar usuario">

        <EditUserForm

          user={editingUser}

          onSubmit={handleUpdateUser}

          isAdminContext={true}

          onCancel={() => setEditingUser(null)}

        />

      </BasicCard>

    );

  }

  return (

    <BasicCard titulo="Usuarios">

      <UserList

        users={users}

        mode={mode}

        onEdit={(u) => setEditingUser(u)}

        onDelete={handleDeleteUser}

      />

    </BasicCard>

  );

}

export default ManageUsersPage;