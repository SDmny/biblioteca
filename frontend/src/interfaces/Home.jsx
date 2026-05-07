import { Link } from "react-router-dom";
import BasicButton from "../components/ui/BasicButton.jsx";

function Home() {
  return (
    <>
      <main className="container main-container text-center">
        <h2 className="mb-4 text-main">Bienvenido a la Biblioteca Digital</h2>

        <div className="mt-4">
          <img
            src="/biblioteca_digital.jpeg"
            alt="Biblioteca Digital"
            className="img-fluid rounded shadow"
          />
        </div>

        <p className="mb-4">
          Explora nuestro catálogo de libros digitales y accede a contenido de
          todo tipo de manera gratuita.
        </p>

        <BasicButton to={"/libros"} texto={"Ver catálogo"} />
      </main>
    </>
  );
}

export default Home;
