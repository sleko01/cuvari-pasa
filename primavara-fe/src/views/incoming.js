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

function MyOffers(){
    const [offers, setOffers] = React.useState()
    var offersPending = []

    React.useEffect(() => {
        let id = localStorage.getItem('id');
        axios.get('/api/agreedRequest/myOfferings/' + id).then(response => {
            console.log(response.data);
            for (const [key, value] of Object.entries(response.data)){
                offersPending.push(value)
            }
            setOffers(offersPending)
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);
    function acceptRequest(offer) {

    }

    function denyRequest(offer) {

    }

    function displayOffer(offer){
        if (offer.requestGuardian){
            return (
                <div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Tip: </span>
                        <span className='panel-info-item-value'>Zahtjev</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Korisnik: </span>
                        <span className='panel-info-item-value'>{offer.initiator_user.username}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Lokacija: </span>
                        <span className='panel-info-item-value'>{offer.requestGuardian.locationName}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Početak: </span>
                        <span className='panel-info-item-value'>{offer.requestGuardian.guardTimeBegin.split("T")[0]}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'></span>
                        {<span className='panel-info-item-value'>{offer.requestGuardian.guardTimeBegin.split("T")[1].substring(0, offer.requestGuardian.guardTimeBegin.split("T")[1].length - 10)}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Kraj: </span>
                        <span className='panel-info-item-value'>{offer.requestGuardian.guardTimeEnd.split("T")[0]}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'></span>
                        {<span className='panel-info-item-value'>{offer.requestGuardian.guardTimeEnd.split("T")[1].substring(0, offer.requestGuardian.guardTimeEnd.split("T")[1].length - 10)}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Ima psa:</span>
                        {<span className='panel-info-item-value'>{offer.initiator_user.hasDog ? "Ima" : "Nema"}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Ima iskustva:</span>
                        {<span className='panel-info-item-value'>{offer.initiator_user.hasExperience ? "Ima" : "Nema"}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Ocjena:</span>
                        {<span className='panel-info-item-value'>{offer.initiator_user.ratingCount==0 ? 0 : offer.initiator_user.ratingSum/offer.initiator_user.ratingCount}</span>}
                    </div>
                    <div className="empty-space"></div>
                    <div className='profile-button-container-centered'>
                        <button className="button button-primary" onClick={() => acceptRequest(offer)}>Prihvati</button>
                        <button className="button button-primary" onClick={() => denyRequest(offer)}>Odbij</button>
                    </div>

                </div>
            )
        } else if (offer.requestDog){
            return(
                <div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Tip: </span>
                        <span className='panel-info-item-value'>Oglas</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Korisnik: </span>
                        <span className='panel-info-item-value'>{offer.initiator_user.username}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Lokacija: </span>
                        <span className='panel-info-item-value'>{offer.requestDog.locationName}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Početak: </span>
                        <span className='panel-info-item-value'>{offer.requestDog.dogTimeBegin.split("T")[0]}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'></span>
                        {<span className='panel-info-item-value'>{offer.requestDog.dogTimeBegin.split("T")[1].substring(0, offer.requestDog.dogTimeBegin.split("T")[1].length - 10)}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Kraj: </span>
                        <span className='panel-info-item-value'>{offer.requestDog.dogTimeEnd.split("T")[0]}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'></span>
                        {<span className='panel-info-item-value'>{offer.requestDog.dogTimeEnd.split("T")[1].substring(0, offer.requestDog.dogTimeEnd.split("T")[1].length - 10)}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Ima psa:</span>
                        {<span className='panel-info-item-value'>{offer.initiator_user.hasDog ? "Ima" : "Nema"}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Ima iskustva:</span>
                        {<span className='panel-info-item-value'>{offer.initiator_user.hasExperience ? "Ima" : "Nema"}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Ocjena:</span>
                        {<span className='panel-info-item-value'>{offer.initiator_user.ratingCount==0 ? 0 : offer.initiator_user.ratingSum/offer.initiator_user.ratingCount}</span>}
                    </div>
                    <div className="empty-space"></div>
                    <div className='profile-button-container-centered'>
                        <button className="button button-primary" onClick={() => acceptRequest(offer)}>Prihvati</button>
                        <button className="button button-primary" onClick={() => denyRequest(offer)}>Odbij</button>
                    </div>
                </div>
            )
        }
    }

    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Pristigle ponude</title>
            </Helmet>

            <Navbar/>

            <div className="profile-info background-blackolive">

                <div className="ro-page-content">
                    <div className='ro-bar'>
                        <span className='home-title'>
                            Pristigle ponude
                        </span>
                    </div>
                    <hr className='hr-color-apricot'/>

                    <div className='panel-container'>
                        {offers && offers.map(offerType =>
                            offerType && offerType.map(offer =>
                                <div className="panel-content background-white">
                                    {displayOffer(offer)}
                                </div>
                            )
                        )}
                    </div>

                </div>

                <div className="ro-page-content">
                    <div className='ro-bar'>
                        <span className='home-title'>
                            Povijest ponuda
                        </span>
                    </div>
                    <hr className='hr-color-apricot'/>

                    <div className='panel-container'>
                        {//-II- + zvezde
                        }
                    </div>

                </div>
            </div>

            <Footer/>
        </div>

    )
}

export default MyOffers;