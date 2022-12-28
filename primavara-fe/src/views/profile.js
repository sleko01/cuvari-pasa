import React from 'react'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'

import './home.css'
import '../index.css'

function Profile(){
    //samo jedan od ova 2 ispod smije biti otkomentiran

    //const [user, setUser] = React.useState()
    const user = {username: "Eugen", email: "eg@gmail.com", rating: "999999"}


    //React.useEffect(); tu implementacija fetcha usera po id
    

    return(
        <div className="page-container mandatory-scroll-snapping">
            <Helmet>
                <title>CuvariPasa | Naslovnica</title>
            </Helmet>

            <Navbar/>

            <span>{user.username} {user.email} {user.rating}</span>
        </div>
    )
}

export default Profile;