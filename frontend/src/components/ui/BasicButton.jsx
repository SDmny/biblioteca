import { Link } from "react-router-dom";

function BasicButton({ to, texto }) {
  return (
    <>
      <Link className="btn btn-pink" to={to}>
        {texto}
      </Link>
    </>
  );
}

export default BasicButton;
