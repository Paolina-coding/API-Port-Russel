import Header from "../header.jsx";
import { useEffect, useState } from "react";


const TableauDeBord = () => {
  const dateActuelle = new Date().toLocaleDateString("fr-FR");
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentReservations, setCurrentReservations] = useState([]); 
  
  useEffect(() => { 
    const token = localStorage.getItem("token"); 
    
    fetch("/reservations/current", { headers: { "Authorization": "Bearer " + token } }) 
    .then(res => res.json()) 
    .then(data => {setCurrentReservations(data)}) 
    .catch(err => console.error(err)); 
  }, []);

  return (
    <main className="container">
      <Header/>
      <div className="text-center">
        <h1>Tableau de bord</h1>
      </div>
      <hr />
      <div>
        <div>
          <h2>Bonjour {user.username}, {user.email}</h2>
          <p>Nous sommes le {dateActuelle}</p>
          <p>Pour accéder aux pages ou se déconnecter merci d'utiliser le menu en haut de la page.</p>
        </div>
        <hr />
        <div>
          <h2>Voici les réservations en cours:</h2>
          <div>
            {currentReservations.length === 0 && ( <p>Aucune réservation en cours.</p> )}
            <ul> 
              {currentReservations.map(r => ( 
                <li key={r._id}> Catway {r.catwayNumber} — Client : {r.clientName} <br /> Du {new Date(r.startDate).toLocaleDateString("fr-FR")} au {new Date(r.endDate).toLocaleDateString("fr-FR")} </li> ))} 
            </ul>     
          </div>
        </div>
      </div>      
    </main>
  );
};

export default TableauDeBord;