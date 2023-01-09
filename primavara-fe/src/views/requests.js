import React from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import '../styles/responsive.css'
import '../styles/home.css'
import '../styles/index.css'
import '../styles/moderation.css'
import '../styles/profile.css'
import '../styles/requestsAndOffers.css'

function Requests(){
    const [requests, setRequests] = React.useState([])

    React.useEffect(() => {
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        var id = localStorage.getItem("id") == undefined ? "" : localStorage.getItem("id")
        axios.get('/api/reqgua/' + id, { headers : {'Authorization': basicAuth}}).then(response => {
            console.log(response.data);
            setRequests(response.data);
        }).catch(err => {
            console.log(err);
            if(localStorage.getItem("id") == undefined) window.location.href = "/users/login";
        })
    }, []);

    function decrypt(password) {
        return CryptoJS.enc.Base64.parse(password).toString(CryptoJS.enc.Utf8);
    }

    function InitiateRequest(request) {
        let idOfUser = localStorage.getItem("id");
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        axios.post('/api/reqgua/initiate/' + request.requestGuardianId + '/' + idOfUser, {},{ headers : {'Authorization': basicAuth}}).then(async response => {
            console.log(response)
            window.alert("Uspješno!")
        }).catch(err => {
            console.log(err);
            if(localStorage.getItem("id") == undefined) window.location.href = "/users/login";
        })
    }

    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Zahtjevi</title>
            </Helmet>

            <Navbar/>

            <div className="profile-info background-blackolive">
                
                <div className="ro-page-content">
                    <div className='ro-bar'>
                        <span className='home-title'>
                            Zahtjevi   
                        </span>
                        <div className='ro-button-container'>
                            <a href="/requests/new" className='button-href'>
                                <button className="button button-gradient">Dodaj novi zahtjev</button>
                            </a>
                        </div>
                    </div>

                    <hr className='hr-color-apricot'/>

                    <div className='panel-container'>
                        {requests && requests.map(request =>
                            <div className='panel-content background-white'>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Korisnik: </span>
                                    <span className='panel-info-item-value'>{request.appUser.username}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Lokacija: </span>
                                    <span className='panel-info-item-value'>{request.locationName}</span>
                                </div>
                                <div className="empty-space-small"></div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Početak: </span>
                                    {<span className='panel-info-item-value'>{request.guardTimeBegin.split("T")[0]}</span>}
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'></span>
                                    {<span className='panel-info-item-value'>{request.guardTimeBegin.split("T")[1].substring(0, request.guardTimeBegin.split("T")[1].length - 10)}</span>}
                                </div>
                                <div className="empty-space-small"></div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Kraj: </span>
                                    {<span className='panel-info-item-value'>{request.guardTimeEnd.split("T")[0]}</span>}
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'></span>
                                    {<span className='panel-info-item-value'>{request.guardTimeEnd.split("T")[1].substring(0, request.guardTimeEnd.split("T")[1].length - 10)}</span>}
                                </div>
                                <div className="empty-space-small"></div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Broj pasa: </span>
                                    <span className='panel-info-item-value'>{request.numberOfDogs}</span>
                                </div>
                                <div className="empty-space"></div>
                                <div className='profile-button-container'>
                                    <button className="button button-primary" onClick={() => InitiateRequest(request)}>Javi se</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Requests;