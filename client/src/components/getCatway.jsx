import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const GetCatway = () => {
    const { id } = useParams(); 
    const [catway, setCatway] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`/catways/${id}`)
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