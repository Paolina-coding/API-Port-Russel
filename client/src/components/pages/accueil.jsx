const Accueil = () => {
  return (
    <main className="container">
      <div class="text-center">
        <h1>Accueil</h1>
      </div>
      <div>
        <div>
          <h2>Présentation de l'application</h2>
          <p>Cette application permet à la capitainerie du Port Russel de gérer ses utilisateurs, catways et réservations.</p>
        </div>
        <div>
          <h2>Connexion</h2>
          <div>
            <form>
                <div class="mb-3">
                    <label for="InputEmail" class="form-label">Adresse Email</label>
                    <input type="email" class="form-control" id="InputEmail1"/>
                </div>
                <div class="mb-3">
                    <label for="InputPassword" class="form-label">Mot de passe</label>
                    <input type="password" class="form-control" id="InputPassword"/>
                </div>
                <button type="submit" class="btn btn-primary">Se connecter</button>
            </form>            
          </div>
        </div>
        <div class="accordion-item">
            <h2>Documentation de l'API</h2>
            <a href="#">Cliquer pour afficher</a>
        </div>
      </div>      
    </main>
  );
};

export default Accueil;