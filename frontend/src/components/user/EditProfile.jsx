import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { supabase } from "../../utils/supabase.js";

import Swal from "sweetalert2";
import BasicCard from "../../components/ui/BasicCard";
import BackButton from "../../components/ui/BackButton";

function EditProfile({ noExtras = false }) {
  const nav = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        setForm(null);
        setLoading(false);
        return;
      }

      const { data: userData } = await supabase
        .from("user")
        .select("*")
        .eq("id", user.id)
        .single();

      setForm(userData);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const changeImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, img: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const guardar = async () => {
    if (!form) return;

    const nombreTrimmed = form.nombre?.trim() || "";
    const apellidoTrimmed = form.apellido?.trim() || "";
    const usuarioTrimmed = form.usuario?.trim() || "";
    const fecNac = form.fec_nac;

    if (!nombreTrimmed || !apellidoTrimmed || !usuarioTrimmed || !fecNac) {
      Swal.fire(
        "Campos incompletos",
        "Debes llenar todos los campos",
        "warning",
      );
      return;
    }

    const year = new Date(fecNac).getFullYear();
    if (year < 1900) {
      Swal.fire(
        "Error",
        "La fecha de nacimiento no puede ser anterior a 1900",
        "error",
      );
      return;
    }

    if (!/^[A-Za-z0-9_-]+$/.test(usuarioTrimmed)) {
      Swal.fire(
        "Error",
        "El nombre de usuario solo puede contener letras, números, guion (-) y guion bajo (_), sin espacios",
        "error",
      );
      return;
    }

    const { error } = await supabase
      .from("user")
      .update({
        nombre: nombreTrimmed,
        apellido: apellidoTrimmed,
        usuario: usuarioTrimmed,
        fec_nac: fecNac,
        img: form.img,
      })
      .eq("id", form.id);

    if (error) {
      Swal.fire("Error", error.message, "error");
    } else {
      Swal.fire("Éxito", "Perfil guardado correctamente", "success");
    }
  };

  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) nav("/");
  };

  const borrarCuenta = async () => {
    Swal.fire({
      title: "¿Borrar cuenta?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await supabase.from("user").delete().eq("id", form.id);
        await supabase.auth.signOut();
        nav("/");
      }
    });
  };

  if (loading) return <p>Cargando...</p>;
  if (!form) return <p>No autorizado</p>;

  return (
    <>
      <BasicCard titulo="Modificar perfil">
        <div style={{ textAlign: "center" }}>
          <img
            src={form.img || "/src/assets/images/user.png"}
            width="90"
            style={{ borderRadius: "50%" }}
          />
          <br />
          <input type="file" onChange={changeImg} />
        </div>
        <br />
        Nombre
        <input
          className="form-control"
          name="nombre"
          value={form.nombre || ""}
          onChange={change}
        />
        <br />
        Apellido
        <input
          className="form-control"
          name="apellido"
          value={form.apellido || ""}
          onChange={change}
        />
        <br />
        Usuario
        <input
          className="form-control"
          name="usuario"
          value={form.usuario || ""}
          onChange={change}
        />
        <br />
        Fecha de nacimiento
        <input
          className="form-control"
          type="date"
          name="fec_nac"
          value={form.fec_nac || ""}
          onChange={change}
        />
        <br />
        <button className="btn-main me-2" onClick={guardar}>
          Guardar
        </button>
        {!noExtras ? (
          <>
            <hr />
            <button className="btn-main me-2" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
            <button className="btn-main me-2" onClick={borrarCuenta}>
              Borrar cuenta
            </button>
          </>
        ) : null}
      </BasicCard>
    </>
  );
}

export default EditProfile;
