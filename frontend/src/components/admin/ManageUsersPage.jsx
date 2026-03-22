import { useState } from "react";
import Swal from "sweetalert2";
import UserList from "../../components/user/UserList.jsx";
import AddUserForm from "../../components/user/AddUserForm.jsx";
import EditUserForm from "../../components/user/EditUserForm.jsx";
import BasicCard from "../../components/ui/BasicCard.jsx";

function ManageUsersPage({ mode = "all" }) {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || []);
  const [editingUser, setEditingUser] = useState(null);

  const handleCreateUser = (user) => {
    if (!user.nombre || !user.apellido || !user.usuario || !user.email || !user.password) {
      Swal.fire("Campos incompletos", "Debes llenar todos los campos", "warning");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      Swal.fire("Error", "Correo electrónico inválido", "error");
      return;
    }
    if (user.password.length < 6) {
      Swal.fire("Error", "La contraseña debe tener al menos 6 caracteres", "error");
      return;
    }
    if (users.some((u) => u.usuario === user.usuario)) {
      Swal.fire("Error", "Ese usuario ya existe", "error");
      return;
    }
    const updated = [...users, user];
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    Swal.fire("Éxito", "Usuario creado correctamente", "success");
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "¿Seguro que quieres borrar el usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((res) => {
      if (res.isConfirmed) {
        const updated = users.filter((u) => u.usuario !== id);
        setUsers(updated);
        localStorage.setItem("users", JSON.stringify(updated));
        Swal.fire("Eliminado", "Usuario borrado correctamente", "success");
      }
    });
  };

  const handleUpdateUser = (user) => {
    if (!user.nombre || !user.apellido || !user.usuario || !user.email) {
      Swal.fire("Campos incompletos", "Debes llenar todos los campos", "warning");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      Swal.fire("Error", "Correo electrónico inválido", "error");
      return;
    }
    const updated = users.map((u) => (u.usuario === user.usuario ? user : u));
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
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