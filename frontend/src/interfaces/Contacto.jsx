import BackButton from "../components/ui/BackButton";
import BasicCard from "../components/ui/BasicCard";

function Contacto() {
  return (
    <>
      <div className="container main-container">
        <BackButton ruta="/" />
        <BasicCard titulo={"Contacto"}>
          <p>
            Esta sección tiene como objetivo brindar un medio de comunicación
            entre los usuarios y la biblioteca digital. A través de los datos
            proporcionados, se pueden realizar consultas relacionadas con el uso
            del sitio y el acceso a los libros. Se buscará ofrecer respuestas
            oportunas y asistencia para mejorar la experiencia de los usuarios.
          </p>
          <p>
            <strong>Correo electrónico:</strong> biblioteca@gmail.com
            <br />
            <strong>Teléfono:</strong> +52 44 33 86 75 21
          </p>
        </BasicCard>
      </div>
    </>
  );
}

export default Contacto;
