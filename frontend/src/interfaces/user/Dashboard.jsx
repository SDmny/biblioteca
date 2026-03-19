import AddBookForm from "../../components/book/AddBookForm";
import AddUserForm from "../../components/user/AddUserForm";

function Dashboard() {
  return (
    <>
      <AddUserForm></AddUserForm>
      <AddBookForm></AddBookForm>
    </>
  );
}

export default Dashboard;
