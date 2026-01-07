const Accueil = () => {
  return (
    <main className="container">
      <div className="text-center">
        <h1>Accueil</h1>
      </div>
      <div>
        <div>
          <h2>Présentation de l'application</h2>
          <p>Cette application permet à la capitainerie du Port Russel de gérer ses utilisateurs, catways et réservations.</p>
          <p>Une fois connecté, un utilisateur qui a les permissions pourra accéder à la liste des autres utilisateurs, des catways et des réservations. La personne pourra aussi modifier, ajouter ou supprimer des éléments de ces catégories.</p>
        </div>
        <hr />
        <div>
          <h2>Connexion</h2>
          <div>
            <form>
                <div className="mb-3">
                    <label htmlfor="InputEmail" className="form-label">Adresse Email</label>
                    <input type="email" className="form-control" id="InputEmail1"/>
                </div>
                <div className="mb-3">
                    <label htmlfor="InputPassword" className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" id="InputPassword"/>
                </div>
                <button type="submit" className="btn btn-primary">Se connecter</button>
            </form>            
          </div>
        </div>
        <hr />
        <div className="accordion-item">
            <h2>Documentation de l'API</h2>
            <a href="https://github.com/Paolina-coding/API-Port-Russel/">Cliquer pour afficher</a>
        </div>
      </div>      
    </main>
  );
};

export default Accueil;