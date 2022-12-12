import React from 'react'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import './home.css'

function Profile(){
    const [user, setUser] = React.useState()

    React.useEffect() //tu implementacija fetcha usera po id

    return(
        <div className="page-container mandatory-scroll-snapping">
            <Helmet>
                <title>CuvariPasa | Naslovnica</title>
            </Helmet>

            <Navbar/>

            <span>{user.username} {user.email} {user.rating}</span>

            <Footer/>
        </div>
    )
}

export default Profile;