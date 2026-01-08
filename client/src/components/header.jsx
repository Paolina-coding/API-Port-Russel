import Nav from "./nav";

const Header = () => {
  return (
      <nav class="navbar navbar-expand-lg bg-dark navbar-dark text-uppercase">
        <div class="container-fluid">
          <p class="navbar-brand">Port Russel</p>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse navbar-nav ms-auto" id="navbarNavAltMarkup" >
            <Nav/>
          </div>
        </div>
      </nav>   
  );
};

export default Header;