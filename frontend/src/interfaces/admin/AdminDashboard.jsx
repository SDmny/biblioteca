import { useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar.jsx";

import UserList from "../../components/user/UserList.jsx";
import AddUsers from "../../components/admin/AddUsers.jsx";

import BookList from "../../components/book/BookList.jsx";
import AddBook from "../user/AddBook.jsx";

import EditProfile from "../../components/user/EditProfile.jsx";

function AdminDashboard() {

  const [selected, setSelected] =
    useState("book-list");


  const renderContent = () => {

    switch (selected) {

      case "user-list":
        return <UserList />;

      case "user-add":
        return <AddUsers />;

      case "user-edit":
        return <UserList mode="edit" />;

      case "user-delete":
        return <UserList mode="delete" />;

      case "book-list":
        return <BookList />;

      case "book-add":
        return <AddBook noMove={true} />;

      case "book-edit":
        return <BookList mode="edit" />;

      case "book-delete":
        return <BookList mode="delete" />;

      case "profile":
        return <EditProfile noExtras />;

      default:
        return <BookList />;

    }

  };


  return (

    <div className="catalog-container">

      <AdminSidebar
        onSelect={setSelected}
      />

      <div className="catalog-content">

        {renderContent()}

      </div>

    </div>

  );

}

export default AdminDashboard;