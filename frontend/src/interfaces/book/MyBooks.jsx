import { useNavigate } from "react-router-dom";
import { useCatalogo } from "../../utils/useCatalogo.js";
import SidebarFilter from "../../components/book/SidebarFilter.jsx";
import BookGrid from "../../components/book/BookGrid.jsx";
import BackButton from "../../components/ui/BackButton.jsx";

function MyBooks() {
  const nav = useNavigate();
  const { filtered, search, user, filtrar, buscar } = useCatalogo();

  const misLibros = filtered.filter(b => b.usuario === user?.usuario);

  return (
    <div className="main-container">
      <BackButton ruta="/perfil" />
      <div className="catalog-container">
        <SidebarFilter filtrar={filtrar} />

        <div className="catalog-content">
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <input
              className="form-control"
              style={{
                height: 35,
                padding: "4px 8px",
              }}
              placeholder="Buscar en mis libros..."
              value={search}
              onChange={(e) => buscar(e.target.value)}
            />

            <button className="btn btn-main" onClick={() => nav("/add-book")}>
              Añadir libro
            </button>
          </div>

          <h3 className="mb-4">Mis Publicaciones ({misLibros.length})</h3>
          <BookGrid books={misLibros} />
        </div>
      </div>
    </div>
  );
}

export default MyBooks;