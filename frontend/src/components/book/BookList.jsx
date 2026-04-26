import { useCatalogo } from "../../utils/useCatalogo.js";
import NavFilter from "./NavFilter.jsx";
import BookGrid from "./BookGrid.jsx";

function BookList({ isAdmin = false }) {
  const { filtered, search, filtrar, buscar } = useCatalogo();

  return (
    <div className={isAdmin ? "" : "catalog-container"}>
      <div className={isAdmin ? "" : "catalog-content"}>
        
        {/* Filtros */}
        <div style={isAdmin ? { marginBottom: "20px", width: "100%" } : {}}>
          <NavFilter filtrar={filtrar} isAdmin={isAdmin} />
        </div>

        {/* Buscador y Grid */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "20px", padding: isAdmin ? "0" : "0 20px" }}>
            <input
              className="form-control"
              placeholder="Buscar por título o autor..."
              value={search}
              style={{ maxWidth: isAdmin ? "100%" : "100%" }}
              onChange={(e) => buscar(e.target.value)}
            />
          </div>
          
          <BookGrid books={filtered} isAdmin={isAdmin} />
        </div>

      </div>
    </div>
  );
}

export default BookList;