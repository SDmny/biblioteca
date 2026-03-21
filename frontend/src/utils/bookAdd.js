export const bookAdd = (book, user, nav, noMove = false) => {
  const libros = JSON.parse(localStorage.getItem("books")) || [];

  const nuevo = {
    id: Date.now(),
    title: book.title,
    author: book.author,
    edition: book.edition || "",
    genre: book.genre,
    description: book.synopsis || "",
    pages: book.pages,
    date: book.date,
    image: book.image,
    file: book.file,
    usuario: user?.usuario || "anonimo",
    rating: 0,
  };

  libros.push(nuevo);
  localStorage.setItem("books", JSON.stringify(libros));
  if (!noMove) {
    nav(-1);
  }
};
