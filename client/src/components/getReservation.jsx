import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * Affiche les détails d’une réservation pour un catway.
 *
 * Le composant récupère les paramètres `catwayNumber` et `idReservation` depuis l’URL puis effectue un appel API vers `/catways/:catwayNumber/reservations/:idReservation` pour récupérer les informations.
 * 
 * - Si la réservation n’existe pas ou si l’API renvoie une erreur, un message d’erreur est affiché avec un bouton pour revenir au gestionnaire des réservations.
 * - Tant que les données ne sont pas encore chargées, un message “Chargement...” est affiché.
 * - Une fois les données récupérées, les détails de la réservation (client, bateau, dates de début et de fin) sont affichés dans une carte Bootstrap.
 *
 * @component
 * @returns {JSX.Element} Une carte affichant les détails de la réservation ou un message d’erreur
 */
const GetReservation = () => {
    const { catwayNumber, idReservation } = useParams();
    const [reservation, setReservation] = useState(null);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`/catways/${catwayNumber}/reservations/${idReservation}`, {headers: { "Authorization": "Bearer " + token }})
            .then(res => {
                if (!res.ok) {
                    throw new Error("Réservation introuvable");
                }
                return res.json();
            })
            .then(data => setReservation(data))
            .catch(err => setError(err.message));
    }, [catwayNumber, idReservation]);

    if (error) {
        return <div>
            <p className="text-danger">{error}</p>
            <div className="text-center mt-3">
                <Link to={`/catways/${catwayNumber}/reservations`} className="btn btn-secondary">Retour au gestionnaire des réservations</Link>
            </div>
        </div>;
    }

    if (!reservation) {
        return <p>Chargement...</p>;
    }

    return ( 
        <div>
            <div className="card mx-auto mt-4" style={{width: "24rem"}}>
                <div className="card-body">
                    <h3 className="card-title">Détails de la réservation {idReservation}</h3>
                    <div className="card-text"><ul> 
                        <li>Nom du client : {reservation.clientName}</li> 
                        <li>Nom du bateau : {reservation.boatName}</li>
                        <li>Date de début : {reservation.startDate}</li>
                        <li>Date de fin : {reservation.endDate}</li>
                    </ul>
                    </div>
                </div>
            </div>
            <div className="text-center mt-3">
                <Link to={`/catways/${catwayNumber}/reservations`} className="btn btn-secondary">Retour au gestionnaire des réservations</Link>
            </div>
        </div>
    ); 
}; 

export default GetReservation;