import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import UserList from "../../components/user/UserList.jsx";
import AddUsers from "../../components/admin/AddUsers.jsx";
import BookList from "../../components/book/BookList.jsx";
import AddBook from "../user/AddBook.jsx";
import EditProfile from "../../components/user/EditProfile.jsx";

function AdminDashboard() {
  const [selected, setSelected] = useState("book-list");

  const renderContent = () => {
    switch (selected) {
      case "user-list": return <UserList />;
      case "user-add": return <AddUsers />;
      case "book-list": return <BookList isAdmin={true} />;
      case "book-add": return <AddBook noMove={true} />;
      case "profile": return <EditProfile noExtras />;
      default: return <BookList isAdmin={true} />;
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      backgroundColor: "#f4f6f8" 
    }}>
      <AdminSidebar onSelect={setSelected} />

      <div style={{ 
        flex: 1, 
        padding: "30px", 
        marginLeft: "310px",
        paddingBottom: "100px",
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: "1250px", margin: "0 auto" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;