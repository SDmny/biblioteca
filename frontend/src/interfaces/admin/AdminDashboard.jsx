import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin/libros">Gestión de Libros</Link>
          </li>
          <li>
            <Link to="/admin/usuarios">Gestión de Usuarios</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminDashboard;
