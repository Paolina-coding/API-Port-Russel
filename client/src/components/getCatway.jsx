import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../config";

/**
 * Affiche les détails d’un catway.
 *
 * Le composant récupère l’identifiant du catway depuis les paramètres d’URL, puis effectue un appel API vers `/catways/:id` pour récupérer les informations du catway.
 *
 * - Si l’API renvoie une erreur (catway inexistant, token invalide, etc.), un message d’erreur est affiché avec un bouton pour revenir au gestionnaire des catways.
 * - Tant que les données ne sont pas encore chargées, un message “Chargement...” est affiché.
 * - Une fois les données récupérées, les détails du catway (numéro, type, état) sont affichés dans une carte Bootstrap.
 *
 * @component
 * @returns {JSX.Element} Une carte affichant les détails du catway ou un message d’erreur
 */
const GetCatway = () => {
    const { id } = useParams(); 
    const [catway, setCatway] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch(`${API_URL}/catways/${id}`, { headers: { "Authorization": "Bearer " + token }})
            .then(res => {
                if (!res.ok) {
                    throw new Error("Catway introuvable");
                }
                return res.json();
            })
            .then(data => setCatway(data))
            .catch(err => setError(err.message));
    }, [id]);

    if (error) {
        return <div>
            <p className="text-danger">{error}</p>
            <div className="text-center mt-3">
                <Link to="/catways" className="btn btn-secondary">Retour au gestionnaire des catways</Link>
            </div>
        </div>;
    }

    if (!catway) {
        return <p>Chargement...</p>;
    }

    return ( 
        <div>
            <div className="card mx-auto mt-4" style={{width: "24rem"}}>
                <div className="card-body">
                    <h3 className="card-title">Détails du catway {catway.catwayNumber}</h3>
                    <div className="card-text"><ul> 
                        <li>Type : {catway.catwayType}</li> 
                        <li>État : {catway.catwayState}</li>
                    </ul>
                    </div>
                </div>
            </div>
            <div className="text-center mt-3">
                <Link to="/catways" className="btn btn-secondary">Retour au gestionnaire des catways</Link>
            </div>
        </div>
    ); 
}; 

export default GetCatway;