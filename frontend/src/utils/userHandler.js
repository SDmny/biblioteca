export const handleCreateUser = (user, nav, isAdminContext = false) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Si no trae rol, lo forzamos a "user"
  if (!user.role) {
    user.role = "user";
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  if (isAdminContext) {
    alert("Usuario creado por administrador");
    nav("/admin/usuarios"); // redirige a la lista de usuarios
  } else {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Usuario registrado e iniciado sesión");
    nav("/libros");
  }
};
