import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { supabase } from "../../utils/supabase";
import BasicCard from "../../components/ui/BasicCard";
import BackButton from "../../components/ui/BackButton";

function ForgotPassword() {
  const nav = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [step, setStep] = useState(loggedUser ? 2 : 1);
  const [usuario, setUsuario] = useState(loggedUser ? loggedUser.usuario : "");
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const enviarCodigo = async () => {
    const { data: userData, error: userError } = await supabase
      .from("user")
      .select("email")
      .eq("username", usuario)
      .maybeSingle();

    if (userError || !userData) {
      Swal.fire("Error", "No se encontró el nombre de usuario", "error");
      return;
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(userData.email, {
      redirectTo: window.location.origin + "/reset-password",
    });

    if (resetError) {
      console.error("Error de Supabase:", resetError);
      Swal.fire({
        title: "Error de servidor",
        text: "Supabase no pudo procesar el envío. Revisa que la plantilla de correo en el Dashboard tenga un 'Subject' y que no hayas superado el límite de 3 correos por hora.",
        icon: "error"
      });
    } else {
      setEmail(userData.email);
      Swal.fire("Correo enviado", "Revisa tu bandeja de entrada", "success");
      setStep(2);
    }
  };

  const verificarCodigo = async () => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: codigo,
      type: "recovery"
    });

    if (error) {
      Swal.fire("Código inválido", "El código es incorrecto o ha expirado", "error");
    } else {
      setStep(3);
    }
  };

  const cambiarPass = async () => {
    if (newPass !== confirmPass) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    if (newPass.length < 6) {
      Swal.fire("Seguridad", "La contraseña debe tener al menos 6 caracteres", "warning");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPass });

    if (error) {
      Swal.fire("Error", "No se pudo actualizar. Intenta obtener un nuevo código.", "error");
    } else {
      Swal.fire("¡Éxito!", "Contraseña actualizada correctamente", "success").then(() => {
        nav(loggedUser && loggedUser.usuario === usuario ? "/perfil" : "/login");
      });
    }
  };

  return (
    <div className="main-container">
      <BackButton />
      <BasicCard titulo="Restablecer Contraseña">
        {step === 1 && (
          <div>
            <label className="form-label">Nombre de usuario</label>
            <input className="form-control" placeholder="Tu usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
            <button className="btn-main mt-3" onClick={enviarCodigo}>Enviar código</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p>Se envió un código a tu correo vinculado.</p>
            <label className="form-label">Código de 6 dígitos</label>
            <input className="form-control" placeholder="000000" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
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
            <button className="btn-main mt-3" onClick={cambiarPass}>Actualizar contraseña</button>
          </div>
        )}
      </BasicCard>
    </div>
  );
}

export default ForgotPassword;