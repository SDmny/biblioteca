import { useCatalogo } from "../../utils/useCatalogo.js";

import NavFilter from "../../components/book/NavFilter.jsx";
import BookGrid from "../../components/book/BookGrid.jsx";

function BookList({ mode = "all" }) {

  const {
    filtered,
    search,
    user,
    filtrar,
    buscar,
  } = useCatalogo();


  return (

    <div className="catalog-container">

      <div className="catalog-content">

        <nav className="filters-navbar">

          <NavFilter filtrar={filtrar} />

          <input
            className="form-control"
            placeholder="Buscar libro..."
            value={search}
            onChange={(e) =>
              buscar(e.target.value)
            }
          />

        </nav>


        <BookGrid
          books={filtered}
          mode={mode}
        />

      </div>

    </div>

  );

}

export default BookList;