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
  const [uploading, setUploading] = useState(false);

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

      if (userData) {
        setForm({
          ...userData,
          nombre: userData.name || "",
          apellido: userData.lastname || "",
          usuario: userData.username || "",
          fec_nac: userData.birthdate || "",
          img: userData.image_url || ""
        });
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const obtenerErrores = () => {
    if (!form) return [];
    let errores = [];

    const nombreTrimmed = form.nombre?.trim() || "";
    const apellidoTrimmed = form.apellido?.trim() || "";
    const usuarioTrimmed = form.usuario?.trim() || "";
    const fecNac = form.fec_nac;

    if (nombreTrimmed.length < 2) errores.push("Nombre (min. 2 letras)");
    if (apellidoTrimmed.length < 2) errores.push("Apellido (min. 2 letras)");
    if (!/^[A-Za-z0-9_-]+$/.test(usuarioTrimmed)) errores.push("Usuario (letras, números, _ o -)");
    
    if (!fecNac) {
      errores.push("Fecha de nacimiento");
    } else {
      const fechaSeleccionada = new Date(fecNac);
      const fechaActual = new Date();
      if (fechaSeleccionada.getFullYear() < 1900) errores.push("Año inválido");
      if (fechaSeleccionada > fechaActual) errores.push("Fecha no puede ser futura");
    }

    if (uploading) errores.push("Espera a que suba la imagen");

    return errores;
  };

  const erroresActuales = obtenerErrores();
  const formularioEsValido = erroresActuales.length === 0;

  const changeImg = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('Images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('Images')
        .getPublicUrl(fileName);

      setForm({ ...form, img: publicUrl });
      
    } catch (error) {
      Swal.fire("Error", "No se pudo subir la imagen", "error");
    } finally {
      setUploading(false);
    }
  };

  const guardar = async () => {
    if (!formularioEsValido) return;

    const { error } = await supabase
      .from("user")
      .update({
        name: form.nombre.trim(),
        lastname: form.apellido.trim(),
        username: form.usuario.trim(),
        birthdate: form.fec_nac,
        image_url: form.img,
      })
      .eq("id", form.id);

    if (error) {
      Swal.fire("Error", error.message, "error");
    } else {
      Swal.fire("Éxito", "Perfil guardado correctamente", "success").then(() => {
        nav("/perfil");
      });
    }
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
        try {
          const { error: dbError } = await supabase
            .from("user")
            .delete()
            .eq("id", form.id);

          if (dbError) throw dbError;

          await supabase.auth.signOut();
          window.location.href = "/";
        } catch (error) {
          Swal.fire("Error", "Error al borrar: " + error.message, "error");
        }
      }
    });
  };

  if (loading) return <p className="text-center mt-5">Cargando perfil...</p>;
  if (!form) return <p className="text-center mt-5">No autorizado</p>;

  return (
    <>
      <BasicCard titulo="Modificar perfil">
        <div style={{ textAlign: "center" }}>
          <img
            src={form.img || "/src/assets/images/user.png"}
            width="90"
            style={{ borderRadius: "50%", height: "90px", objectFit: "cover" }}
          />
          <br />
          <input type="file" className="mt-2" onChange={changeImg} disabled={uploading} />
          {uploading && <p style={{fontSize: '12px', color: '#666'}}>Subiendo imagen...</p>}
        </div>
        <br />
        <label className="fw-bold">Nombre</label>
        <input className="form-control" name="nombre" value={form.nombre || ""} onChange={change} />
        <br />
        <label className="fw-bold">Apellido</label>
        <input className="form-control" name="apellido" value={form.apellido || ""} onChange={change} />
        <br />
        <label className="fw-bold">Usuario</label>
        <input className="form-control" name="usuario" value={form.usuario || ""} onChange={change} />
        <br />
        <label className="fw-bold">Fecha de nacimiento</label>
        <input className="form-control" type="date" name="fec_nac" value={form.fec_nac || ""} onChange={change} />
        
        <div className="mt-4">
          {erroresActuales.length > 0 ? (
            <div className="alert alert-warning py-2" style={{ fontSize: '0.85rem' }}>
              <strong>Pendiente:</strong> {erroresActuales.join(", ")}
            </div>
          ) : (
            <div className="alert alert-success py-2" style={{ fontSize: '0.85rem' }}>
              ✓ Información correcta
            </div>
          )}
        </div>

        <button 
          className="btn-main w-100 mt-2" 
          onClick={guardar} 
          disabled={!formularioEsValido}
          style={{ 
            opacity: formularioEsValido ? 1 : 0.5,
            cursor: formularioEsValido ? "pointer" : "not-allowed",
            fontWeight: 'bold',
            padding: '10px'
          }}
        >
          {uploading ? "Procesando..." : "Guardar Cambios"}
        </button>

        {!noExtras ? (
          <>
            <hr />
            <button className="btn-main w-100" onClick={borrarCuenta} style={{backgroundColor: '#dc3545', backgroundImage: 'none'}}>
              Borrar cuenta
            </button>
          </>
        ) : null}
      </BasicCard>
    </>
  );
}

export default EditProfile;