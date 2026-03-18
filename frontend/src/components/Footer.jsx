function Footer() {
  return (
    <>
      <footer className="bg-pink text-white text-center py-3 mt-4">
        &copy; 2026 Biblioteca. Todos los derechos reservados.
        <br />
        <a href="https://validator.w3.org/nu/#textarea">
          <img
            src="https://www.w3.org/Icons/valid-html401"
            alt="Valid HTML 5.0"
            className="validator-badge"
          />
        </a>
        <a href="https://jigsaw.w3.org/css-validator/#validate-by-input">
          <img
            src="https://jigsaw.w3.org/css-validator/images/vcss"
            alt="Valid CSS"
            className="validator-badge"
          />
        </a>
      </footer>
    </>
  );
}

export default Footer;
