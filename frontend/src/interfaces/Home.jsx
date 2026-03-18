function Home() {
  return (
    <>
      <main className="container main-container text-center">
        <h2 className="mb-4">Bienvenido a la Biblioteca Digital</h2>
        <div className="mt-4">
          <img
            src="src/assets/images/biblioteca_digital.jpeg"
            alt="Biblioteca Digital"
            className="img-fluid rounded shadow"
          />
        </div>
        <p className="mb-4">
          Explora nuestro catálogo de libros digitales y accede a contenido de
          todo tipo de manera gratuita.
        </p>
        <a href="libros.htm" className="btn btn-custom px-4">
          Ver catálogo
        </a>
      </main>
    </>
  );
}

export default Home;
