import React from 'react'
import { Helmet } from 'react-helmet'
import CryptoJS from 'crypto-js'

import '../styles/responsive.css'
import '../styles/home.css'
import '../styles/index.css'
import '../styles/moderation.css'
import '../styles/profile.css'
import '../styles/requestsAndOffers.css'
import Navbar from "./partials/navbar";
import {useLocation} from "react-router-dom";
import axios from 'axios'


function decrypt(password) {
    return CryptoJS.enc.Base64.parse(password).toString(CryptoJS.enc.Utf8);
}


function BestOffer(){
    const { state } = useLocation();
    function acceptOffer(offer, requestId){
        console.log(state)
        let idOfUser = localStorage.getItem('id');
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        axios.post('/api/agreedRequest/initiate/' + state.reqGua + '/' + state.bestOffer.requestDogId + '/' + idOfUser, { headers : {'Authorization': basicAuth}}).then(response => {
            console.log(response)
        }).catch(err => {
            window.alert(err.response.data.message)
        })
    }
    function denyOffer(offer, requestId){
        window.location.href("/offers")
    }

    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Najbolja ponuda</title>
            </Helmet>

            <Navbar/>
            <div className="profile-info background-blackolive">
                <div className="ro-page-content">
                    <div className='ro-bar'>
                        <span className='home-title'>
                            Najbolja ponuda
                        </span>
                    </div>
                    <hr className='hr-color-apricot'/>

                    <div className="panel-container">
                        <div className='panel-content background-white'>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Korisnik: </span>
                                <span className='panel-info-item-value'>{state.bestOffer.appUser.username}</span>
                            </div>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Lokacija: </span>
                                <span className='panel-info-item-value'>{state.bestOffer.locationName}</span>
                            </div>
                            <div className='empty-space-small'/>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Početak: </span>
                                <span className='panel-info-item-value'>{state.bestOffer.dogTimeBegin.split("T")[0]}</span>
                            </div>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'></span>
                                {<span className='panel-info-item-value'>{state.bestOffer.dogTimeBegin.split("T")[1].substring(0, state.bestOffer.dogTimeBegin.split("T")[1].length - 10)}</span>}
                            </div>
                            <div className='empty-space-small'/>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Kraj: </span>
                                <span className='panel-info-item-value'>{state.bestOffer.dogTimeEnd.split("T")[0]}</span>
                            </div>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'></span>
                                {<span className='panel-info-item-value'>{state.bestOffer.dogTimeEnd.split("T")[1].substring(0, state.bestOffer.dogTimeEnd.split("T")[1].length - 10)}</span>}
                            </div>
                            <div className='empty-space-small'/>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Fleksibilno:  </span>
                                <span className='panel-info-item-value'>{state.bestOffer.flexible == true ? "Je" : "Nije"}</span>
                            </div>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Iskustvo:  </span>
                                <span className='panel-info-item-value'>{state.bestOffer.hasDog == true ? "Ima" : "Nema"}</span>
                            </div>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Ima li psa:  </span>
                                <span className='panel-info-item-value'>{state.bestOffer.hasExperience == true ? "Ima" : "Nema"}</span>
                            </div>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Broj pasa: </span>
                                <span className='panel-info-item-value'>{state.bestOffer.numberOfDogs}</span>
                            </div>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Željena starost: </span>
                                <span className='panel-info-item-value'>{state.bestOffer.dogAge}</span>
                            </div>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Željena pasmina: </span>
                                <span className='panel-info-item-value'>{state.bestOffer.breed.name}</span>
                            </div>
                            <div className="empty-space"></div>
                            <div className='profile-button-container-centered'>
                                <button className="button button-primary" onClick={() => acceptOffer(state.bestOffer, state.reqGua)}>Prihvati</button>
                                <button className="button button-primary" onClick={() => denyOffer(state.bestOffer, state.reqGua)}>Odbij</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>

    );
}

export default BestOffer;