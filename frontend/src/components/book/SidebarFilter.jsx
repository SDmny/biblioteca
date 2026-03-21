import FilterOptions from "./FilterOptions";

function Sidebar({ filtrar }) {
  return (
    <div className="sidebar">
      <FilterOptions onAction={filtrar} />
    </div>
  );
}

export default Sidebar;
