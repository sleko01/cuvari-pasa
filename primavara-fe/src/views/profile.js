import React, { useEffect } from 'react'
import axios, {AxiosError} from "axios";

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'

import '../styles/home.css'
import '../styles/index.css'
import '../styles/profile.css'

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

            <div className="profile-info">
                <div className='profile-info-item'>
                    <span className='profile-info-item-name'>Korisničko ime: </span>
                    <span className='profile-info-item-value'>{user.username}</span>
                </div>
                <div className='profile-info-item'>
                    <span className='profile-info-item-name'>Ime: </span>
                    <span className='profile-info-item-value'>{user.firstName}</span>
                </div>
                <div className='profile-info-item'>
                    <span className='profile-info-item-name'>Prezime: </span>
                    <span className='profile-info-item-value'>{user.lastName}</span>
                </div>
                <div className='profile-info-item'>
                    <span className='profile-info-item-name'>Email:  </span>
                    <span className='profile-info-item-value'>{user.email}</span>
                </div>
                <div className='profile-info-item'>
                    <span className='profile-info-item-name'>Rating:  </span>
                    <span className='profile-info-item-value'>{user.ratingCount == 0 ? 0 : user.rating}</span>
                </div>
            </div>
        </div>
    )
}

export default Profile;