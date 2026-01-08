import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReservationList = ({refresh}) => {
    const { catwayNumber } = useParams();
    const [reservation, setReservation] = useState([]);

    useEffect(() => {
        fetch(`/catways/${catwayNumber}/reservations`)
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