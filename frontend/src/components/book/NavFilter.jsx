import FilterOptions from "./FilterOptions";

function NavFilter({ filtrar, isAdmin }) {
  if (isAdmin) {
    // Modo Admin
    return (
      <div style={{ width: "100%" }}>
        <FilterOptions onAction={filtrar} isAdmin={true} />
      </div>
    );
  }

  // Modo Usuario
  return (
    <div className="catalog-container">
      <div className="catalog-content">
        <nav className="filters-navbar">
          <FilterOptions onAction={filtrar} isAdmin={false} />
        </nav>
      </div>
    </div>
  );
}

export default NavFilter;