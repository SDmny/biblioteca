import UserDashboard from "../interfaces/user/ProfileView.jsx";
import AdminDashboard from "../interfaces/admin/AdminDashboard.jsx";

function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (!currentUser) {
    return <p>No has iniciado sesión</p>;
  }

  if (currentUser.rol === "admin") {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}

export default Dashboard;
