import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Si no hay usuario o no es admin, redirige a inicio
  if (!currentUser || currentUser.rol !== "admin") {
    return <Navigate to="/" />;
  }

  // Si es admin, renderiza la ruta protegida
  return children;
}

export default AdminRoute;
