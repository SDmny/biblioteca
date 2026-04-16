import { Routes, Route } from "react-router-dom";

import Home from "../interfaces/Home.jsx";
import Contacto from "../interfaces/Contacto.jsx";
import Conocenos from "../interfaces/Conocenos.jsx";
import Dashboard from "../interfaces/Dashboard.jsx";

import Catalogo from "../interfaces/book/Catalogo.jsx";
import BookDetailPage from "../interfaces/book/BookDetailPage.jsx";
import MyBooks from "../interfaces/book/MyBooks.jsx";

import ProfilePage from "../interfaces/user/ProfilePage.jsx";
import ProfileView from "../interfaces/user/ProfileView.jsx";
import AddBook from "../interfaces/user/AddBook.jsx";
import EditBook from "../interfaces/user/EditBook.jsx";
import ForgotPassword from "../interfaces/user/ForgotPassword.jsx";

import LoginPage from "../components/user/LoginPage.jsx";
import RegisterPage from "../components/user/RegisterPage.jsx";

import AdminRoute from "./AdminRoute.jsx";
import AdminDashboard from "../interfaces/admin/AdminDashboard.jsx";
import AdminUserForm from "../components/admin/AdminUserForm.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* PUBLICAS */}
      <Route path="/" element={<Home />} />
      <Route path="/conocenos" element={<Conocenos />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/libros" element={<Catalogo />} />
      <Route path="/libro/:id" element={<BookDetailPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ForgotPassword />} />

      <Route path="/perfil" element={<ProfileView />} />
      <Route path="/profile-edit" element={<ProfilePage />} />
      <Route path="/my-books" element={<MyBooks />} />

      <Route path="/add-book" element={<AddBook />} />
      <Route path="/edit-book/:id" element={<EditBook />} />

      <Route path="/dashboard" element={<Dashboard />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/usuarios/add"
        element={
          <AdminRoute>
            <AdminUserForm />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/usuarios/edit/:usuario"
        element={
          <AdminRoute>
            <AdminUserForm />
          </AdminRoute>
        }
      />

      {/* Rutas protegidas para admin 

      <Route
        path="/admin/libros"
        element={
          <AdminRoute>
            <ManageBooksPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/usuarios"
        element={
          <AdminRoute>
            <ManageUsersPage />
          </AdminRoute>
        }
      />
      */}
    </Routes>
  );
}

export default AppRoutes;