function Navbar(){
    let isLoggedIn = false;

    //localStorage.setItem("username", "Bosko781u1242")

    function logout() {
        localStorage.removeItem("username");
        localStorage.removeItem("id")
        localStorage.removeItem("encryptedPassword");
        window.location.href = "/";
    }

    //check if logged in
    if (localStorage.getItem("username") != null) {
        isLoggedIn = true;
    }

    //check role
    let roleId = localStorage.getItem("role");
    if (roleId == 4){
        var myModeration = <a href="/moderation">Moderacija</a>
        var myOffers = <a href="/users/offers">Moji oglasi</a>
        var myRequests = <a href="/users/requests">Moji zahtjevi</a>
    }
    else if(roleId == 3){
        var myOffers = <a href="/users/offers">Moji oglasi</a>
        var myRequests = <a href="/users/requests">Moji zahtjevi</a>
    }
    else if(roleId == 2){
        var myOffers = <a href="/users/offers">Moji oglasi</a>
    }
    else if(roleId == 1){
        var myRequests = <a href="/users/requests">Moji zahtjevi</a>
    }

    var myProfile = <a href="/users/profile">Moj račun</a>
    
    
    var myDogs = <a href="/users/dogs">Moji psi</a>
    var myReceived = <a href="/users/incoming">Pristigle ponude</a>
    var myCurrent = <a href="/users/current">Čuvanja u tijeku</a>
    var myLogout = <a href="#" onClick={logout}>Odjava</a>
    


    if (isLoggedIn) {
        var dropdownMenu = <div className="dropdown">
                                <img src="/images/user.png" className="dropdown-image"/>
                                <span className="dropdown-username">{localStorage.getItem("username")}</span>
                                <div className="dropdown-content">
                                    {myProfile}
                                    {myModeration}
                                    {myRequests}
                                    {myOffers}
                                    {myDogs}
                                    {myReceived}
                                    {myCurrent}
                                    {myLogout}
                                </div>
                            </div>
    }
    
    else {
        var loginButton = <a href="/users/login"><button className="button-secondary button">Prijava</button></a>
        var registerButton = <a href="/users/register"><button className="button button-primary">Pridruži se</button></a>
    }

    return(  
      <div className="navbar-container">
          <a href="/" className="button-href">
            <div className="navbar-logo-container">
                <img src="/images/logo.jpg" className="navbar-logo"/>
                <span className="navbar-logo-text">Cuvari Pasa</span>
            </div>
          </a>
          
          <div className="navbar-links">
            <a href="/requests" className="navbar-text navbar-link">Zahtjevi</a>
            <a href="/offers" className="navbar-text navbar-link">Oglasi</a>
                {dropdownMenu}
                {loginButton}
                {registerButton}
          </div>
      </div>
    );
}

export default Navbar;