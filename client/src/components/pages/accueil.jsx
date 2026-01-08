import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Accueil = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const Authenticate = async(e) => {
      e.preventDefault();
      setError("");

      const response = await fetch("/users/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email, password})
      });

      const data = await response.json();

      if(!response.ok) {
        setError("Identifiants incorrects");
        return;
      }

      if(data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      
      navigate("/tableau_de_bord");

    };

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
            <form onSubmit={Authenticate}>
                <div className="mb-3">
                    <label className="form-label">Adresse Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" id="passwordConnection"value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {error && <p className="text-danger">{error}</p>}
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