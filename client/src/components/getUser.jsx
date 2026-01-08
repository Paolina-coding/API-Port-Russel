import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

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