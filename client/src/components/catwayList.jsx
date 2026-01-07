import { useEffect, useState } from "react";

const CatwayList = ({refresh}) => {
    const [catways, setCatways] = useState([]);

    useEffect(() => {
        fetch("/catways")
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
