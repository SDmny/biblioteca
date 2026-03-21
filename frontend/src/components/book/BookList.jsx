import { useCatalogo } from "../../utils/useCatalogo.js";

import NavFilter from "../../components/book/NavFilter.jsx"; // tu bloque de botones
import BookGrid from "../../components/book/BookGrid.jsx";
import BasicButton from "../ui/BasicButton.jsx";

function BookList() {
  const { filtered, search, user, filtrar, buscar } = useCatalogo();

  return (
    <div className="catalog-container">
      <div className="catalog-content">
        {/* NAV superior con filtros y buscador */}
        <nav className="filters-navbar">
          <NavFilter filtrar={filtrar} />

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              className="form-control"
              style={{ height: 35, padding: "4px 8px" }}
              placeholder="Buscar libro..."
              value={search}
              onChange={(e) => buscar(e.target.value)}
            />

            {user && <BasicButton to={"/add-book"} texto={"Añadir libro"} />}
          </div>
        </nav>

        {/* Grid de libros */}
        <BookGrid books={filtered} />
      </div>
    </div>
  );
}

export default BookList;
