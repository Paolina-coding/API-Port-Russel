import { Link } from "react-router-dom";
import { useState } from "react";

/**
 * Page permettant d’accéder aux réservations d’un catway.
 *
 * Le composant demande à l’utilisateur de saisir un numéro de catway, puis génère dynamiquement un lien vers la page listant les réservations associées :
 * - Le champ de saisie met à jour l’état `catwayNumber` à chaque frappe.
 * - Le bouton “Valider” est désactivé tant qu’aucun numéro n’est renseigné.
 * - Une fois un numéro saisi, l’utilisateur peut accéder à la page des réservations du catway correspondant.
 * - Un bouton permet également de revenir au tableau de bord.
 *
 * @component
 * @returns {JSX.Element} Une interface simple permettant de sélectionner un catway pour consulter ses réservations
 */

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
        <Link className="btn btn-secondary m-5" to={`/tableau_de_bord`}>Retour au tableau de bord</Link> 
    </main>
  );
};

export default Reservations;
