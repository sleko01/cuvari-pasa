import React from 'react'
import { Helmet } from 'react-helmet'

import '../styles/home.css'
import '../styles/index.css'
import '../styles/moderation.css'
import '../styles/profile.css'
import '../styles/requestsAndOffers.css'

function Blocked(){
    function logout() {
        localStorage.removeItem("username");
        localStorage.removeItem("id")
        localStorage.removeItem("encryptedPassword")
        window.location.href = "/";
    }

    return (
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Moji psi</title>
            </Helmet>

            <div className="profile-info">
            <div className='profile-text-content'>
                    <h1>
                        Pristup zabranjen!
                    </h1>
                    <span>
                        Vaš račun je suspendiran, za više informacije kontaktirajte admina.
                    </span>
                    <div className='empty-space'/>
                    <div className="profile-button-container">
                        <a href="#" className='primary-button' onClick={logout}>
                            <button className="button button-primary">Odjava</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Blocked;