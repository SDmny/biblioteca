import { useNavigate } from "react-router-dom";

function BackButton({ texto = "Volver" }) {
  const navigate = useNavigate();

  return (
    <button className="btn-main me-2" onClick={() => navigate(-1)}>
      {texto}
    </button>
  );
}

export default BackButton;
