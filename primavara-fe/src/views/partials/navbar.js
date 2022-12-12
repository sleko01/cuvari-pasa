function Navbar(){
    let isLoggedIn = true;


    if (localStorage.getItem("username") == null) {
        isLoggedIn = false;
        //localStorage.setItem("username", "Bosko781248u1242")
    }

    function logout() {
        localStorage.removeItem("username");
        localStorage.removeItem("id");
        window.location.href = "/";
    }

    if (isLoggedIn) {
        var dropdownMenu = <div className="dropdown">
                                <img src="/images/user.png" className="dropdown-image"/>
                                <span className="dropdown-username">{localStorage.getItem("username")}</span>
                                <div className="dropdown-content">
                                    <a href="#home">Home</a>
                                    <a href="#about">About</a>
                                    <a href="#" onClick={logout}>Odjava</a>
                                </div>
                            </div>
    } else {
        var loginButton = <a href="/users/login"><button className="button-secondary button">Prijava</button></a>
        var registerButton = <a href="/users/register"><button className="button button-primary">Pridruži se</button></a>
    }

    return(
      <div className="navbar-container">
          <div className="navbar-logo-container">
            <img src="/images/logo.jpg" className="navbar-logo"/>
              <span className="navbar-logo-text">Cuvari Pasa</span>
          </div>
          <div className="navbar-links">
            <a href="/" className="navbar-text navbar-link">Kontakt</a>
            <a href="/" className="navbar-text navbar-link">Zahtjevi</a>
            <a href="/" className="navbar-text navbar-link">Oglasi</a>
                {dropdownMenu}
                {loginButton}
                {registerButton}
          </div>
      </div>
    );
}

export default Navbar;