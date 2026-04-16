import BasicCard from "../ui/BasicCard";

function SeeProfile({ user, children }) {
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

        {children}
      </BasicCard>
    </>
  );
}

export default SeeProfile;