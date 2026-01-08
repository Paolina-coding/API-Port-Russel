import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * Affiche la liste des réservations d’un catway.
 *
 * Le composant récupère le numéro du catway depuis les paramètres d’URL puis effectue un appel API vers `/catways/:catwayNumber/reservations`
 *
 * - Le `useEffect` se déclenche à chaque changement de `refresh`, pour recharger automatiquement la liste après un ajout, modification ou suppression.
 * - Les réservations sont affichées dans une liste avec identifiant, nom du client, nom du bateau, dates de début et de fin
 *
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {number|string} props.refresh - Déclenche le rechargement de la liste lorsqu’il change
 * @returns {JSX.Element} Une liste des réservations du catway
 */
const ReservationList = ({refresh}) => {
    const { catwayNumber } = useParams();
    const [reservation, setReservation] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`/catways/${catwayNumber}/reservations`, {headers: { "Authorization": "Bearer " + token }})
        .then(res => res.json())
        .then(data => setReservation(data))
        .catch(err => console.error(err));
    }, [refresh]);

    return (
        <div>
        <ul>
            {reservation.map(r => (
            <li key={r._id}>Identifiant de la réservation {r._id} - Nom du client: {r.clientName} - Nom du bateau: {r.boatName} - Date 
            de début: {new Date(r.startDate).toLocaleDateString("fr-FR")} - Date de fin: {new Date(r.endDate).toLocaleDateString("fr-FR")}</li>
            ))}
        </ul>
        </div>
    )};

export default ReservationList;