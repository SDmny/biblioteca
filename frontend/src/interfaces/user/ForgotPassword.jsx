import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BasicCard from "../../components/ui/BasicCard";
import BackButton from "../../components/ui/BackButton";

function ForgotPassword() {
  const nav = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [step, setStep] = useState(loggedUser ? 2 : 1);
  const [usuario, setUsuario] = useState(loggedUser ? loggedUser.usuario : "");
  const [codigo, setCodigo] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const enviarCodigo = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existe = users.find(u => u.usuario === usuario);
    if (!existe) {
      Swal.fire("Error", "El usuario no existe", "error");
      return;
    }
    Swal.fire("Código enviado", "Se ha enviado un código a tu correo (Simulación: 1234)", "info");
    setStep(2);
  };

  const verificarCodigo = () => {
    if (codigo === "1234") {
      setStep(3);
    } else {
      Swal.fire("Error", "Código incorrecto", "error");
    }
  };

  const cambiarPass = () => {
    if (newPass !== confirmPass) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(u => u.usuario === usuario);
    
    if (index !== -1) {
      users[index].password = newPass;
      localStorage.setItem("users", JSON.stringify(users));
      
      if (loggedUser && loggedUser.usuario === usuario) {
        localStorage.setItem("user", JSON.stringify(users[index]));
        
        Swal.fire("Éxito", "Contraseña actualizada", "success")
          .then(() => nav("/perfil")); // Si estaba logueado, vuelve al perfil
      } else {
        Swal.fire("Éxito", "Contraseña actualizada", "success")
          .then(() => nav("/login")); // Si no, va al login
      }
    }
  };

  return (
    <div className="main-container">
      <BackButton />
      <BasicCard titulo="Restablecer Contraseña">
        {step === 1 && (
          <div>
            <label className="form-label">Ingresa tu usuario</label>
            <input className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
            <button className="btn-main mt-3" onClick={enviarCodigo}>Enviar código</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p>Usuario: <b>{usuario}</b></p>
            <label className="form-label">Ingresa el código (1234)</label>
            <input className="form-control" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
            <button className="btn-main mt-3" onClick={verificarCodigo}>Verificar código</button>
            {!loggedUser && (
              <button className="btn-main mt-3 ms-2" onClick={() => setStep(1)} style={{backgroundColor: '#6c757d'}}>Atrás</button>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="form-label">Nueva contraseña</label>
            <input type="password" className="form-control" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
            <br />
            <label className="form-label">Confirmar contraseña</label>
            <input type="password" className="form-control" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
            <button className="btn-main mt-3" onClick={cambiarPass}>Cambiar contraseña</button>
          </div>
        )}
      </BasicCard>
    </div>
  );
}

export default ForgotPassword;