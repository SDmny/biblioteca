import { useNavigate } from "react-router-dom";

import AddUserForm from "../user/AddUserForm.jsx";
import { handleCreateUser } from "../../utils/userHandler.js";
import BasicCard from "../ui/BasicCard.jsx";

function AddUsers() {
  const nav = useNavigate();

  return (
    <>
      <BasicCard titulo={"Agregar Usuario"}>
        <AddUserForm
          onSubmit={(u) => handleCreateUser(u, nav, true)}
          isAdminContext
        />
      </BasicCard>
    </>
  );
}

export default AddUsers;
