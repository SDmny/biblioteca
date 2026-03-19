import { Link } from "react-router-dom";

function BasicButton({ to, texto }) {
  return (
    <>
      <Link className="btn btn-main" to={to}>
        {texto}
      </Link>
    </>
  );
}

export default BasicButton;