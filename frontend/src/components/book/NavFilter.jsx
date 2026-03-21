import FilterOptions from "./FilterOptions";

function NavFilter({ filtrar }) {
  return (
    <div className="catalog-container">
      <div className="catalog-content">
        <nav className="filters-navbar">
          <FilterOptions onAction={filtrar} />
        </nav>
      </div>
    </div>
  );
}

export default NavFilter;
