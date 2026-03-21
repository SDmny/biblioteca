import { Link } from "react-router-dom";

import BasicButton from "../ui/BasicButton";
import BasicCard from "../ui/BasicCard";

function EditProfile({ user, children }) {
  return (
    <>
      <BasicCard titulo="Perfil">
        <div style={{ textAlign: "center" }}>
          <img
            src={user.img || "/src/assets/images/user.png"}
            width="90"
            style={{
              borderRadius: "50%",
            }}
          />

          <h3>
            {user.nombre} {user.apellido}
          </h3>

          <p>{user.usuario}</p>
        </div>

        <br />

        <BasicButton to={"/profile-edit"} texto={"Modificar datos"} />
        <BasicButton to={"/add-book"} texto={"Publicar libro"} />

        <hr />
        {children}
      </BasicCard>
    </>
  );
}

export default EditProfile;
