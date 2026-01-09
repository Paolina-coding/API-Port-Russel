import Header from "../header.jsx";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";

/**
 * Tableau de bord de l’application affiché après une connexion.
 *
 * Ce composant affiche un résumé personnalisé pour l’utilisateur connecté et la liste des réservations actuellement en cours.  
 * Les informations utilisateur sont récupérées depuis le `localStorage`, tandis que les réservations actives sont chargées via l’API `/reservations/current`.
 * - Un appel API est effectué pour récupérer les réservations dont la période inclut la date du jour.
 * - Le token JWT est récupéré depuis le `localStorage` et envoyé dans l’en-tête `Authorization` pour sécuriser la requête.
 * - Les réservations sont affichées sous forme de liste, avec le numéro du catway, le nom du client et les dates.
 * - Si aucune réservation n’est en cours, un message informatif est affiché.
 *
 * @component
 * @returns {JSX.Element} Le tableau de bord affichant les informations utilisateur et les réservations en cours
 */

const TableauDeBord = () => {
  const dateActuelle = new Date().toLocaleDateString("fr-FR");
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentReservations, setCurrentReservations] = useState([]); 
  
  useEffect(() => { 
    const token = localStorage.getItem("token"); 
    
    fetch(`${API_URL}/reservations/current`, { headers: { "Authorization": "Bearer " + token } }) 
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
        <div>
          <a href="https://api-port-russel-4c7k.onrender.com/documentation" className="btn btn-secondary" target="_blank"> Documentation </a>
        </div>
      </div>      
    </main>
  );
};

export default TableauDeBord;