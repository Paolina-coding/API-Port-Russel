import Header from "../header.jsx";


const TableauDeBord = () => {
  const dateActuelle = new Date().toLocaleDateString("fr-FR");
  return (
    <main className="container">
      <Header/>
      <div className="text-center">
        <h1>Tableau de bord</h1>
      </div>
      <hr />
      <div>
        <div>
          <h2>Bonjour //User//, //adresse mail//</h2>
          <p>Nous sommes le {dateActuelle}</p>
          <p>Pour accéder aux pages ou se déconnecter merci d'utiliser le menu en haut de la page.</p>
        </div>
        <hr />
        <div>
          <h2>Voici les réservations en cours:</h2>
          <div>
            <p>//Tableau à rajouter//</p>         
          </div>
        </div>
      </div>      
    </main>
  );
};

export default TableauDeBord;