import { useNavigate, Link } from "react-router-dom";

import AddUserForm from "../user/AddUserForm";
import { handleCreateUser } from "../../utils/userHandler.js";

function ManageUsers() {
  const nav = useNavigate();

  return (
    <>
      <AddUserForm
        onSubmit={(u) => handleCreateUser(u, nav, true)}
        isAdminContext
      />
    </>
  );
}

export default ManageUsers;
