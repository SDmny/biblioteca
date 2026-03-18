import BasicCard from "../components/ui/BasicCard";

function Conocenos() {
  return (
    <>
      <div className="container main-container">
        <BasicCard titulo={"Misión"}>
          <p>
            Nuestra misión como biblioteca digital es proporcionar acceso
            gratuito y organizado a recursos bibliográficos digitales,
            fomentando el hábito de la lectura, el aprendizaje autónomo y el
            desarrollo cultural de los usuarios. A través de una plataforma
            sencilla y accesible, se busca facilitar la consulta y lectura de
            libros de distintas categorías para todo tipo de público."
          </p>
        </BasicCard>
        <BasicCard titulo={"Visión"}>
          <p>
            La visión de la biblioteca es convertirse en un espacio digital de
            referencia para el acceso al conocimiento, promoviendo la lectura
            como una herramienta fundamental para la formación académica,
            personal y el tiempo de ocio. Se aspira a ampliar de manera
            progresiva el catálogo y mejorar la experiencia de los usuarios
            mediante el uso de tecnologías web."
          </p>
        </BasicCard>
      </div>
    </>
  );
}

export default Conocenos;
