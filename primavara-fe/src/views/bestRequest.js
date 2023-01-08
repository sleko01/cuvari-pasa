import React from 'react'
import { Helmet } from 'react-helmet'
import CryptoJS from 'crypto-js'

import '../styles/home.css'
import '../styles/index.css'
import '../styles/moderation.css'
import '../styles/profile.css'
import '../styles/requestsAndOffers.css'
import Navbar from "./partials/navbar";
import {useLocation} from "react-router-dom";
import axios from 'axios'

function BestRequest(){
    const { state } = useLocation();
    console.log(state)

    function acceptRequest(offer, requestId){
        console.log(state)
        let idOfUser = localStorage.getItem('id');
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        axios.post('/api/agreedRequest/initiate/' + state.reqGua + '/' + state.bestOffer.requestDogId + '/' + idOfUser, { headers : {'Authorization': basicAuth}}).then(response => {
            console.log(response)
        }).catch(err => {
            window.alert(err.response.data.message)
        })
    }
    function denyRequest(offer, requestId){
        window.location.href("/requests")
    }

    function decrypt(password) {
        return CryptoJS.enc.Base64.parse(password).toString(CryptoJS.enc.Utf8);
    }

    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Najbolji zahtjev</title>
            </Helmet>

            <Navbar/>

            <div className="profile-info background-blackolive">
                <div className="ro-page-content">
                    <div className='ro-bar'>
                        <span className='home-title'>
                            Najbolji zahtjev
                        </span>
                    </div>
                    <hr className='hr-color-apricot'/>


                    <div className="panel-container">
                        <div className='panel-content background-white'>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Korisnik: </span>
                                <span className='panel-info-item-value'>{state.bestRequest.appUser.username}</span>
                            </div>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Lokacija: </span>
                                <span className='panel-info-item-value'>{state.bestRequest.locationName}</span>
                            </div>
                            <div className='empty-space-small'/>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Početak: </span>
                                <span className='panel-info-item-value'>{state.bestRequest.guardTimeBegin.split("T")[0]}</span>
                            </div>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'></span>
                                {<span className='panel-info-item-value'>{state.bestRequest.guardTimeBegin.split("T")[1].substring(0, state.bestRequest.guardTimeBegin.split("T")[1].length - 10)}</span>}
                            </div>
                            <div className='empty-space-small'/>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Kraj: </span>
                                <span className='panel-info-item-value'>{state.bestRequest.guardTimeEnd.split("T")[0]}</span>
                            </div>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'></span>
                                {<span className='panel-info-item-value'>{state.bestRequest.guardTimeEnd.split("T")[1].substring(0, state.bestRequest.guardTimeEnd.split("T")[1].length - 10)}</span>}
                            </div>
                            <div className='empty-space-small'/>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Broj pasa: </span>
                                <span className='panel-info-item-value'>{state.bestRequest.numberOfDogs}</span>
                            </div>
                            <div className="empty-space"></div>
                            <div className='profile-button-container-centered'>
                                <button className="button button-primary" onClick={() => acceptRequest(state.bestRequest, state.reqDog)}>Prihvati</button>
                                <button className="button button-primary" onClick={() => denyRequest(state.bestRequest, state.reqDog)}>Odbij</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    );
}

export default BestRequest;