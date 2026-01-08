import { Link } from "react-router-dom";
import { useState } from "react";

const Reservations = () => {
  const [catwayNumber, setCatwayNumber] = useState("");
  return (
    <main>
        <h1>Reservations</h1>
        <p>Veuillez renseigner le numéro du catway pour les réservations</p>
        <div className="d-flex gap-2 mb-4">
                <input type="number" className="form-control" placeholder="Numéro du catway" value={catwayNumber} onChange={(e) => setCatwayNumber(e.target.value)}/>
                <Link className={`btn btn-primary ${!catwayNumber ? "disabled" : ""}`} to={`/catways/${catwayNumber}/reservations`}>Valider</Link>
        </div>
    </main>
  );
};

export default Reservations;
