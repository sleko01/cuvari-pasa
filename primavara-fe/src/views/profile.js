import React, { useEffect } from 'react'
import axios, {AxiosError} from "axios";

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'

import '../styles/home.css'
import '../styles/index.css'

function Profile(){
    //samo jedan od ova 2 ispod smije biti otkomentiran

    const [user, setUser] = React.useState([]);
    // let user = {username: "Eugen", email: "eg@gmail.com", rating: "999999"}


    React.useEffect(() => {
        let id = localStorage.getItem('id');
        axios.get('/api/users/profile/' + id).then(response => {
            console.log(response.data);
            setUser(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);


    return(
        <div className="page-container mandatory-scroll-snapping">
            <Helmet>
                <title>CuvariPasa | Naslovnica</title>
            </Helmet>

            <Navbar/>

            <span>{user.username} {user.email} {user.ratingCount == 0 ? 0 : user.rating}</span>
        </div>
    )
}

export default Profile;