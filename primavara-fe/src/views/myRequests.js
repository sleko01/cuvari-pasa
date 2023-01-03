import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import '../styles/home.css'
import '../styles/index.css'
import '../styles/moderation.css'
import '../styles/profile.css'
import '../styles/requestsAndOffers.css'


function MyRequests(){
    const [requests, setRequests] = React.useState([])

    React.useEffect(() => {
        let id = localStorage.getItem('id');
        axios.get('/api/reqgua/my/' + id).then(response => {
            console.log(response.data);
            setRequests(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);


    function FindBestOffer(request){
        let idOfUser = localStorage.getItem("id");
        axios.post('/api/agreedRequest/initiate/' + request.requestGuardianId + '/null/' + idOfUser, {
            "idReqGua": request.requestGuardianId,
            "idReqDog": null,
            "idInitiator": idOfUser
        }).then(async response => {
            console.log(response)
            window.alert("Uspješno!")
        }).catch(err => {
            console.log(err);
            alert(err.response.data.message)
        })
    }

    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Moji Zahtjevi</title>
            </Helmet>

            <Navbar/>

            <div className="profile-info background-blackolive">

                <div className="ro-page-content">
                    <div className='ro-bar'>
                        <span className='home-title'>
                            Moji Zahtjevi
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
                                <div className='empty-space-small'/>
                                <div className='profile-button-container'>
                                    <button className="button button-primary" onClick={() => FindBestOffer(request)}>Najbolja ponuda</button>
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


export default MyRequests;