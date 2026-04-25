import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import Swal from "sweetalert2";

function DetailBook({
  id,
  title,
  author,
  pages,
  edition,
  genre,
  description,
  imageSrc,
  file,
  rating,
  owner,
  ownerId,
  publishDate
}) {
  const [user, setUser] = useState(null);
  const [miPuntuacion, setMiPuntuacion] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);
  const nav = useNavigate();

  useEffect(() => {
    const getSessionAndVote = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();

      if (currentUser) {
        const { data: userProfile } = await supabase
          .from("user")
          .select("role")
          .eq("id", currentUser.id)
          .maybeSingle();

        setUser({ ...currentUser, role: userProfile?.role });

        const { data: voteData } = await supabase
          .from("votes")
          .select("voto")
          .eq("book_id", id)
          .eq("user_id", currentUser.id)
          .maybeSingle();
          
        if (voteData) {
          setMiPuntuacion(voteData.voto);
        }
      }
    };
    getSessionAndVote();
  }, [id]);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const actualizarPromedioRealtime = async () => {
    const { data: votesData } = await supabase
      .from("votes")
      .select("voto")
      .eq("book_id", id);

    if (votesData && votesData.length > 0) {
      const sum = votesData.reduce((acc, curr) => acc + curr.voto, 0);
      setCurrentRating(sum / votesData.length);
    }
  };

  const calificar = async (num) => {
    if (!user) return;
    
    const { data: existingVote } = await supabase
      .from("votes")
      .select("id")
      .eq("book_id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    let error;
    if (existingVote) {
      const { error: updateError } = await supabase
        .from("votes")
        .update({ voto: num })
        .eq("id", existingVote.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("votes")
        .insert([{ book_id: id, user_id: user.id, voto: num }]);
      error = insertError;
    }

    if (error) {
      Swal.fire("Error", "No se pudo actualizar la calificacion", "error");
    } else {
      setMiPuntuacion(num);
      await actualizarPromedioRealtime();
      Swal.fire("Listo", "Calificacion actualizada", "success");
    }
  };

  const handleDownload = async () => {
    if (!file) return;
    try {
      const response = await fetch(file);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    nav(`/edit-book/${id}`);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      const { error } = await supabase
        .from("book")
        .delete()
        .eq("id", id);

      if (error) {
        Swal.fire("Error", "No se pudo borrar el libro", "error");
      } else {
        await Swal.fire("Borrado", "El libro ha sido eliminado", "success");
        nav("/");
      }
    }
  };

  const renderStars = (puntuacionActual, esInteractivo) => {
    let arr = [];
    for (let i = 1; i <= 5; i++) {
      arr.push(
        <span
          key={i}
          onClick={() => esInteractivo && calificar(i)}
          style={{
            fontSize: esInteractivo ? "24px" : "18px",
            cursor: esInteractivo ? "pointer" : "default",
            color: i <= (esInteractivo ? miPuntuacion : puntuacionActual) ? "gold" : "lightgray",
            marginRight: "3px"
          }}
        >
          ★
        </span>
      );
    }
    return arr;
  };

  const isOwner = user && user.id === ownerId;
  const isAdmin = user && (user.role === "admin" || user.role === "administrador");
  const canEditOrDelete = isOwner || isAdmin;

  return (
    <main className="container my-3">
      <div className="card p-4 shadow detalle-libro-card">
        <div className="detalle-libro-container">
          <div className="detalle-libro-info">
            <h3>{title}</h3>
            <p><strong>Autor:</strong> {author}</p>

            {user ? (
              <>
                <p><strong>Páginas:</strong> {pages}</p>
                <p><strong>Edición:</strong> {edition}</p>
                <p><strong>Fecha de Publicación Original:</strong> {publishDate || "No disponible"}</p>
                <p><strong>Género:</strong> {genre}</p>
                <p style={{ textAlign: "justify" }}><strong>Descripción:</strong> {description}</p>

                <div className="ratings-wrapper mt-4">
                  <div className="mb-2">
                    <span className="text-muted small">Calificacion General:</span>
                    <div className="d-flex align-items-center gap-2">
                      <div>{renderStars(currentRating, false)}</div>
                      <span className="fw-bold">{currentRating > 0 ? currentRating.toFixed(1) : "0.0"}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="text-muted small">Tu calificacion:</span>
                    <div className="d-flex align-items-center gap-2">
                      <div>{renderStars(miPuntuacion, true)}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 d-flex gap-2 flex-wrap">
                  {file && (
                    <>
                      <a href={file} target="_blank" rel="noopener noreferrer" className="btn btn-main">Leer</a>
                      <button onClick={handleDownload} className="btn btn-main">Descargar</button>
                    </>
                  )}
                  {canEditOrDelete && (
                    <>
                      <button onClick={handleEdit} className="btn btn-main">Editar</button>
                      <button onClick={handleDelete} className="btn btn-main">Borrar</button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="alert alert-info mt-4" role="alert">
                <i className="bi bi-info-circle me-2"></i>
                Inicia sesión para ver más información, leer o descargar este libro.
              </div>
            )}
          </div>

          <div className="detalle-libro-imagen d-flex flex-column align-items-center">
            <img src={imageSrc || "/img/default.jpg"} alt={title} className="img-fluid rounded shadow mb-3" />
            
            {user && owner && (
              <div className="mt-3 text-center border-top pt-3 w-100">
                <span className="d-block small text-muted text-uppercase mb-2" style={{ letterSpacing: "1px" }}>Publicado por</span>
                <img 
                  src={owner.image_url || "/img/user.png"} 
                  alt={owner.username} 
                  style={{ 
                    width: "60px", 
                    height: "60px", 
                    borderRadius: "50%", 
                    objectFit: "cover",
                    border: "2px solid #eee"
                  }}
                />
                <span className="d-block mt-2 fw-semibold text-dark">
                  {owner.username}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailBook;