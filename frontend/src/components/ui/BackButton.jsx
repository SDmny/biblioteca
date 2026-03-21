import { useNavigate } from "react-router-dom";

function BackButton({ ruta = "", texto = "←" }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (ruta === "") {
      navigate(-1); // retrocede en el historial
    } else {
      navigate(ruta); // siempre va a esa ruta
    }
  };

  return (
    <button className="btn-back" onClick={handleClick}>
      {texto}
    </button>
  );
}

export default BackButton;
