import { Routes, Route } from "react-router-dom";
import Accueil from "./components/pages/accueil.jsx";
import TableauDeBord from "./components/pages/tableau_de_bord";
import Catways from "./components/pages/catways";
import Reservations from "./components/pages/reservations";
import GetCatway from "./components/getCatway.jsx";
import ReservationsCatway from "./components/pages/reservationsCatway";
import GetReservation from "./components/getReservation";
// import Utilisateurs from "./components/pages/utilisateurs";

import './App.css';


function App() {
  return (
    <div className="App">
      <meta name="description" content="API de gestion du Port Russel" />
      <Routes>
      <Route path="/" element={<Accueil />} />
        <Route path="/tableau_de_bord" element={<TableauDeBord />} />
        <Route path="/catways" element={<Catways />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/catways/:id" element={<GetCatway />} />
        <Route path="catways/:catwayNumber/reservations/" element={<ReservationsCatway />} />
        <Route path="/catways/:catwayNumber/reservations/:idReservation" element={<GetReservation />} />
        {/*<Route path="/:catwayNumber/reservations/add" element={<AddReservation />} />
        <Route path="/catways/:catwayNumber//List" element={<ReservationList />} />
        <Route path="/catways/:catwayNumber/reservations/:idReservation/get" element={<GetReservation />} />
        <Route path="/catways/:catwayNumber/reservations/:idReservation/update" element={<UpdateCatway />} />
        <Route path="/:catwayNumber/reservations/:idReservation/delete" element={<DeleteCatway />} />
        
        <Route path="/utilisateurs" element={<Utilisateurs />} /> */}
      </Routes>
    </div>
  );
}

export default App;
