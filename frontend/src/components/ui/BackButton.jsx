function BackButton({ ruta, texto }) {
  return (
    <>
      <div className="mt-3">
        <a href={ruta} className="btn btn-pink">
          {texto}
        </a>
      </div>
    </>
  );
}

export default BackButton;
