import { useNavigate } from "react-router-dom";

import AddBookForm from "../../components/book/AddBookForm";
import BackButton from "../../components/ui/BackButton.jsx";

import { bookAdd } from "../../utils/bookAdd.js";

function AddBook({ noMove = false }) {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (book) => {
    bookAdd(book, user, nav, noMove);
  };

  return (
    <>
      <div className="main-container">
        <BackButton />
        <AddBookForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}

export default AddBook;
