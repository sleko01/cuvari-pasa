function Navbar(){
    return(
      <div className="navbar-container">
        <div className="max-width">
          <div className="navbar-logo-container">
            <img src="/Images/logo.jpg" className="navbar-logo"/>
              <span className="navbar-logo-text">DogWatch</span>
          </div>
          <div className="navbar-links">
            <a href="/" className="navbar-text navbar-link">Kontakt</a>
            <a href="/" className="navbar-text navbar-link">Zahtjevi</a>
            <a href="/" className="navbar-text navbar-link">Oglasi</a>
            <a href="/users/login"><button className="button-secondary button">Prijava</button></a>
            <a href="/users/register"><button className="button button-primary">Pridruži se</button></a>
          </div>
        </div>
      </div>
    );
}

export default Navbar;