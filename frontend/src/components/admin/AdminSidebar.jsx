import { useState } from "react";

function AdminSidebar({ onSelect }) {
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("book-list");

  const handleSelect = (id) => {
    setSelectedBtn(id);
    onSelect(id);
  };

  const azul1 = "#2f6fb0";
  const degradadoActivo = "linear-gradient(135deg, #4a7a4f, #2f6fb0)";

  const getButtonStyle = (id) => {
    const isActive = selectedBtn === id;
    const isHovered = hoveredBtn === id;
    const usarDegradado = isActive || isHovered;

    return {
      padding: '10px 22px',
      fontSize: '14px',
      background: usarDegradado ? degradadoActivo : azul1,
      color: 'white',
      border: 'none',
      borderRadius: '30px',
      cursor: 'pointer',
      width: '100%',
      marginBottom: '8px',
      fontWeight: '600',
      transition: 'all 0.25s ease',
      transform: usarDegradado ? 'scale(0.97)' : 'scale(1)',
      boxShadow: isActive ? 'inset 0 4px 8px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
      outline: 'none',
      textAlign: 'center'
    };
  };

  const titleStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
    marginTop: '15px',
    borderBottom: `2px solid ${azul1}`,
    display: 'inline-block',
    paddingBottom: '3px'
  };

  return (
    <div style={{
      width: '280px',
      minWidth: '280px',
      position: 'fixed', 
      top: '90px',
      left: '20px', 
      height: 'calc(100vh - 200px)',
      zIndex: 100,
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '15px',
      border: '1px solid #ddd',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden'
    }}>
      <div>
        <h3 style={{ 
          color: azul1, 
          fontWeight: '800', 
          marginBottom: '20px', 
          textAlign: 'center',
          fontSize: '1.2rem' 
        }}>
          Panel Administrador
        </h3>

        <div style={titleStyle}>Gestionar Usuarios</div>
        <button 
          style={getButtonStyle("user-list")}
          onMouseEnter={() => setHoveredBtn("user-list")}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={() => handleSelect("user-list")}
        >
          Ver Usuarios
        </button>

        <button 
          style={getButtonStyle("user-add")}
          onMouseEnter={() => setHoveredBtn("user-add")}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={() => handleSelect("user-add")}
        >
          Agregar Usuario
        </button>

        <div style={titleStyle}>Gestionar Libros</div>
        <button 
          style={getButtonStyle("book-list")}
          onMouseEnter={() => setHoveredBtn("book-list")}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={() => handleSelect("book-list")}
        >
          Ver Libros
        </button>

        <button 
          style={getButtonStyle("book-add")}
          onMouseEnter={() => setHoveredBtn("book-add")}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={() => handleSelect("book-add")}
        >
          Agregar Libro
        </button>
      </div>

      <div>
        <div style={titleStyle}>Más Opciones</div>
        <button 
          style={getButtonStyle("profile")}
          onMouseEnter={() => setHoveredBtn("profile")}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={() => handleSelect("profile")}
        >
          Editar Perfil
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;