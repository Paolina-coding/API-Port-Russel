import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li><Link to="/" className="nav-link">Accueil</Link></li>
        <li><Link to="/catways" className="nav-link">Catways</Link></li>
        <li><Link to="/reservations" className="nav-link">Reservations</Link></li>
        <li><Link to="/users" className="nav-link">Utilisateurs</Link></li>
        <li><Link to="/documentation" className="nav-link">Documentation</Link></li>
        <Link to="/" className="nav-link" onClick={() => {localStorage.removeItem("token"); localStorage.removeItem("user");}} >Se déconnecter</Link>
    </ul>  

  );
};

export default Nav;