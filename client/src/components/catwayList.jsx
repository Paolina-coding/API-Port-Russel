import { useEffect, useState } from "react";
import { API_URL } from "../config";

/**
 * Affiche la liste des catways.
 *
 * Le composant récupère la liste des catways depuis l’API avec `/catways`. Ceci est effectué à chaque fois que la valeur de `refresh` change (par exemple quand on rajoute, modifie ou supprime un catway)
 * Le token d’authentification est récupéré dans le `localStorage` et envoyé dans l’en-tête `Authorization` car la requête est sécurisée.
 * Une fois les données chargées, les catways sont affichés dans une liste, avec numéro, type et état.
 *
 * En cas d’erreur réseau, celle-ci est affichée dans la console.
 *
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {number|string} props.refresh - Déclenche le rechargement de la liste lorsqu’il change
 * @returns {JSX.Element} La liste des catways affichée dans un `<ul>`
 */
const CatwayList = ({refresh}) => {
    const [catways, setCatways] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch(`${API_URL}/catways`, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(res => res.json())
        .then(data => setCatways(data))
        .catch(err => console.error(err));
    }, [refresh]);

    return (
        <div>
        <ul>
            {catways.map(c => (
            <li key={c._id}>Catway numéro {c.catwayNumber} - Type: {c.catwayType} - Etat: {c.catwayState}</li>
            ))}
        </ul>
        </div>
    )};

export default CatwayList;
