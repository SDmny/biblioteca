import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  return (
    <Router>
      <Header />
      <div id="contenido">
        <AppRoutes />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
