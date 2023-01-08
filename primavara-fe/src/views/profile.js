import React, { useEffect } from 'react'
import axios, {AxiosError} from "axios";

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'

import '../styles/home.css'
import '../styles/index.css'
import '../styles/moderation.css'
import '../styles/profile.css'
import '../styles/requestsAndOffers.css'

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
            console.log(err)
            if(localStorage.getItem('id') == undefined) window.location.href = "/users/login"
        })
    }, []);


    if(localStorage.role == 1){
        var role = <span>vlasnik</span>
    }
    else if(localStorage.role == 2){
        var role = <span>čuvar</span>
    }
    else if(localStorage.role == 3){
        var role = <span>vlasnik i čuvar</span>
    }
    else{
        var role = <span>admin</span>
    }

    return(
        <div className="ro-page-container">
            <Helmet>
                <title>CuvariPasa | Moj profil</title>
            </Helmet>

            <Navbar/>

            <div className="profile-info">
                <div className='profile-text-content background-citrus'>
                    <div className='profile-info-item'>
                        <span className='profile-info-item-name'>Korisničko ime: </span>
                        <span className='profile-info-item-value'>{user.username}</span>
                    </div>
                    
                    <div className='profile-info-item'>
                        <span className='profile-info-item-name'>Uloga: </span>
                        <span className='profile-info-item-value'>{role}</span>
                    </div>
                    <div className='empty-space'/>
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
                    <div className='empty-space'/>
                    <div className='profile-info-item'>
                        <span className='profile-info-item-name'>Rating:  </span>
                        <span className='profile-info-item-value'>{user.ratingCount == 0 ? 0 : user.ratingSum/user.ratingCount}</span>
                    </div>
                    <div className='empty-space'/>
                    <div className='profile-button-container'>
                        <a href='/users/dogs' className='button-href'>
                            <button className="button button-primary"> Moji psi</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
