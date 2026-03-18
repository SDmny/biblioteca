import DetailBook from "./components/book/DetailBook";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BackButton from "./components/ui/BackButton";

function App() {
  return (
    <>
      <Header />

      <DetailBook />

      <BackButton ruta="/" texto="← Volver al catálogo" />

      <Footer />
    </>
  );
}

export default App;
