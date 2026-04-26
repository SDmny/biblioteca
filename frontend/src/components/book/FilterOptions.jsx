import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

function FilterOptions({ onAction }) {
  const [genres, setGenres] = useState([]);
  const [genreSearch, setGenreSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [minPages, setMinPages] = useState(0);
  const [baseFilter, setBaseFilter] = useState("todos");
  const [authorSearch, setAuthorSearch] = useState(""); 
  const [hoveredBtn, setHoveredBtn] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await supabase.from("genre").select("genre").order("genre");
      setGenres(data || []);
    };
    fetchGenres();
  }, []);

  const emitirFiltros = (base, genres, pages, author) => {
    onAction("aplicar_filtros_globales", { base, genres, pages, author });
  };

  const handleBase = (tipo) => {
    const nuevoBase = baseFilter === tipo ? "todos" : tipo;
    setBaseFilter(nuevoBase);
    emitirFiltros(nuevoBase, selectedGenres, minPages, authorSearch);
  };

  const addGenre = (genre) => {
    if (!selectedGenres.includes(genre)) {
      const updated = [...selectedGenres, genre];
      setSelectedGenres(updated);
      setGenreSearch(""); 
      emitirFiltros(baseFilter, updated, minPages, authorSearch);
    }
  };

  const removeGenre = (genre) => {
    const updated = selectedGenres.filter((g) => g !== genre);
    setSelectedGenres(updated);
    emitirFiltros(baseFilter, updated, minPages, authorSearch);
  };

  const getDynamicStyle = (id, isActive, isGenreTag = false) => {
    const isHovered = hoveredBtn === id;
    const azul1 = "#2f6fb0";
    const azulClaroGenre = "#f0f7ff";
    const degradadoActivo = "linear-gradient(135deg, #4a7a4f, #2f6fb0)"; 

    const usarDegradado = isActive || isHovered;

    let background = isGenreTag ? (usarDegradado ? degradadoActivo : azulClaroGenre) : (usarDegradado ? degradadoActivo : azul1);
    let color = usarDegradado ? "white" : (isGenreTag ? azul1 : "white");

    return {
      padding: isGenreTag ? '4px 10px' : '10px 22px',
      fontSize: isGenreTag ? '0.7rem' : '14px',
      background: background,
      color: color,
      border: isGenreTag && !usarDegradado ? '1px solid #cfe0fc' : 'none',
      borderRadius: isGenreTag ? '15px' : '30px',
      cursor: 'pointer',
      width: isGenreTag ? 'auto' : '100%',
      marginBottom: isGenreTag ? '0' : '8px',
      fontWeight: '600',
      transition: 'all 0.25s ease',
      transform: usarDegradado ? 'scale(0.97)' : 'scale(1)',
      boxShadow: isActive ? 'inset 0 4px 8px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
      outline: 'none',
      display: isGenreTag ? 'inline-flex' : 'block',
      alignItems: 'center',
      gap: '5px'
    };
  };

  return (
    <div className="sidebar-container" style={{ position: 'relative' }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>Filtros</h3>
        <small 
          onClick={() => { 
            setBaseFilter("todos"); setSelectedGenres([]); setMinPages(0); setAuthorSearch("");
            emitirFiltros("todos", [], 0, ""); 
          }}
          style={{ cursor: 'pointer', color: '#2f6fb0', fontWeight: 'bold' }}
        >
          Limpiar Todo
        </small>
      </div>

      {/* 1. Botones de Base */}
      {['todos', 'populares', 'nuevos'].map((tipo) => (
        <button 
          key={tipo}
          className="btn-main"
          style={getDynamicStyle(tipo, baseFilter === tipo)}
          onMouseEnter={() => setHoveredBtn(tipo)}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={() => handleBase(tipo)}
        >
          {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
        </button>
      ))}

      {/* 2. Sección de Autor */}
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4>Autor</h4>
          <small 
            onClick={() => { setAuthorSearch(""); emitirFiltros(baseFilter, selectedGenres, minPages, ""); }}
            style={{ cursor: 'pointer', color: '#2f6fb0', fontSize: '0.75rem' }}
          >
            Limpiar
          </small>
        </div>
        <input 
          type="text" className="form-control" placeholder="Nombre del autor..." 
          style={{ height: 35, fontSize: '0.85rem' }}
          value={authorSearch}
          onChange={(e) => { 
            setAuthorSearch(e.target.value); 
            emitirFiltros(baseFilter, selectedGenres, minPages, e.target.value); 
          }}
        />
      </div>

      {/* 3. Sección de Géneros */}
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4>Género</h4>
          <small 
            onClick={() => { setSelectedGenres([]); emitirFiltros(baseFilter, [], minPages, authorSearch); }}
            style={{ cursor: 'pointer', color: '#2f6fb0', fontSize: '0.75rem' }}
          >
            Limpiar
          </small>
        </div>

        <div className="d-flex flex-wrap gap-1 mb-2">
          {selectedGenres.map((g) => (
            <span 
              key={g} 
              style={getDynamicStyle(g, true, true)}
              onClick={() => removeGenre(g)}
            >
              {g} <span style={{ fontSize: '0.6rem', marginLeft: '2px' }}>✖</span>
            </span>
          ))}
        </div>
        
        <input 
          type="text" className="form-control mb-1" placeholder="Buscar y añadir..." 
          style={{ height: 30, fontSize: '0.8rem' }}
          value={genreSearch}
          onChange={(e) => setGenreSearch(e.target.value)}
        />

        {genreSearch && (
          <div style={{ 
            position: 'absolute', zIndex: 100, background: 'white', width: '100%',
            border: '1px solid #ddd', borderRadius: '8px', maxHeight: '150px', overflowY: 'auto',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            {genres.filter(g => g.genre.toLowerCase().includes(genreSearch.toLowerCase())).map(g => (
              <div 
                key={g.genre} 
                onClick={() => addGenre(g.genre)}
                style={{ padding: '8px', cursor: 'pointer', fontSize: '0.8rem', borderBottom: '1px solid #eee' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f7ff'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                + {g.genre}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Sección de Páginas */}
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4>Páginas</h4>
          <small 
            onClick={() => { setMinPages(0); emitirFiltros(baseFilter, selectedGenres, 0, authorSearch); }}
            style={{ cursor: 'pointer', color: '#2f6fb0', fontSize: '0.75rem' }}
          >
            Limpiar
          </small>
        </div>
        
        <input 
          type="range" className="form-range" min="0" max="1000" step="50"
          value={minPages} 
          onChange={(e) => { setMinPages(e.target.value); emitirFiltros(baseFilter, selectedGenres, e.target.value, authorSearch); }} 
        />
        <div className="d-flex justify-content-between" style={{ fontSize: '0.75rem' }}>
          <span>0</span>
          <span style={{ fontWeight: 'bold', color: '#2f6fb0' }}>Mín: {minPages}</span>
          <span>1000+</span>
        </div>
      </div>
    </div>
  );
}

export default FilterOptions;