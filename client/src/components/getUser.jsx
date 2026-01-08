import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * Affiche les informations d’un utilisateur.
 *
 * Le composant récupère l’adresse email depuis les paramètres d’URL puis effectue un appel API vers `/users/:email` afin de charger les informations.
 *
 * - Si l’utilisateur n’existe pas ou si l’API renvoie une erreur, un message d’erreur est affiché avec un bouton pour revenir au gestionnaire des utilisateurs.
 * - Tant que les données ne sont pas encore chargées, un message “Chargement...” est affiché.
 * - Une fois les données récupérées, les informations de l’utilisateur (nom d’utilisateur, email) sont affichées dans une carte Bootstrap.
 *
 * @component
 * @returns {JSX.Element} Une carte affichant les informations de l’utilisateur ou un message d’erreur
 */
const GetUser = () => {
    const { email } = useParams(); 
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`/users/${email}`, { headers: { "Authorization": "Bearer " + token }})
            .then(res => {
                if (!res.ok) {
                    throw new Error("Utilisateur introuvable");
                }
                return res.json();
            })
            .then(data => setUser(data))
            .catch(err => setError(err.message));
    }, [email]);

    if (error) {
        return <div>
            <p className="text-danger">{error}</p>
            <div className="text-center mt-3">
                <Link to="/users" className="btn btn-secondary">Retour au gestionnaire des utilisateurs</Link>
            </div>
        </div>;
    }

    if (!user) {
        return <p>Chargement...</p>;
    }

    return ( 
        <div>
            <div className="card mx-auto mt-4" style={{width: "24rem"}}>
                <div className="card-body">
                    <h3 className="card-title">Informations sur l'utilisateur</h3>
                    <div className="card-text"><ul> 
                        <li>Nom d'utilisateur : {user.username}</li> 
                        <li>Email : {user.email}</li>
                    </ul>
                    </div>
                </div>
            </div>
            <div className="text-center mt-3">
                <Link to="/users" className="btn btn-secondary">Retour au gestionnaire des utilisateurs</Link>
            </div>
        </div>
    ); 
}; 

export default GetUser;