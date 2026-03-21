import { Link } from "react-router-dom";

function BasicButton({ to, texto }) {
  return (
    <>
      <Link className="btn-main me-2" to={to}>
        {texto}
      </Link>
    </>
  );
}

export default BasicButton;
