import React from 'react'
import axios from 'axios'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import '../styles/home.css'
import '../styles/index.css'
import '../styles/requestsAndOffers.css'

function Requests(){
    const [requests, setRequests] = React.useState([])

    React.useEffect(() => {
        axios.get('/api/reqgua').then(response => {
            console.log(response.data);
            setRequests(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

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
                                    <span className='panel-info-item-value'>{request.location}</span>
                                </div>

                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Početak: </span>
                                    <span className='panel-info-item-value'>{request.guardTimeBegin.substring(0,10)}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Kraj: </span>
                                    <span className='panel-info-item-value'>{request.guardTimeEnd.substring(0,10)}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Broj pasa: </span>
                                    <span className='panel-info-item-value'>{request.numberOfDogs}</span>
                                </div>

                                <div className="empty-space"></div>
                                <div className='profile-button-container'>
                                    <button className="button button-primary">Javi se</button>
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