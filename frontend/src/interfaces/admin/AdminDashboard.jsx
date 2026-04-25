import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar.jsx";

import UserList from "../../components/user/UserList.jsx";
import AddUsers from "../../components/admin/AddUsers.jsx";

import BookList from "../../components/book/BookList.jsx";
import AddBook from "../user/AddBook.jsx";

import EditProfile from "../../components/user/EditProfile.jsx";

function AdminDashboard() {
  const [selected, setSelected] = useState(
    localStorage.getItem("adminSelected") || "user-list",
  );
  useEffect(() => {
    if (selected) {
      localStorage.setItem("adminSelected", selected);
    }
  }, [selected]);

  const renderContent = () => {
    switch (selected) {
      case "user-list":
        return <UserList />;

      case "user-add":
        return <AddUsers />;

      case "book-list":
        return <BookList />;

      case "book-add":
        return <AddBook noMove={true} />;

      case "profile":
        return <EditProfile noExtras />;

      default:
        return <BookList />;
    }
  };

  return (
    <div className="catalog-container">
      <AdminSidebar onSelect={setSelected} />

      <div className="catalog-content">{renderContent()}</div>
    </div>
  );
}

export default AdminDashboard;
