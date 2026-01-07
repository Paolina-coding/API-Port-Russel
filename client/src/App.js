import { Routes, Route } from "react-router-dom";
import Accueil from "../client/src/components/pages/accueil.jsx";
import TableauDeBord from "./client/src/components/pages/tableau_de_bord.js";
import Catways from "../client/src/components/pages/catways.jsx";
import Reservations from "../client/src/components/pages/reservations.jsx";
import Utilisateurs from "../client/src/components/pages/utilisateurs.jsx";
import Header from "../client/src/components/header.jsx";
import Footer from "../client/src/components/footer.jsx";

import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <div className="App">
      <meta name="description" content="API de gestion du Port Russel" />
      <Header />
      <Routes>
      <Route path="/" element={<Accueil />} />
        <Route path="/tableau_de_bord" element={<TableauDeBord />} />
        <Route path="/catways" element={<Catways />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/utilisateurs" element={<Utilisateurs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
