import React from 'react'
import axios from 'axios'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'
import { useNavigate } from 'react-router-dom'

import '../styles/home.css'
import '../styles/index.css'
import '../styles/moderation.css'
import '../styles/profile.css'
import '../styles/requestsAndOffers.css'

function MyOffers(){
    const [offers, setOffers] = React.useState([])

    React.useEffect(() => {
        let id = localStorage.getItem('id');
        axios.get('/api/reqdog/my/' + id).then(response => {
            console.log(response.data);
            setOffers(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

    const navigate = useNavigate();

    function FindBestRequest(offer){
        // let idOfUser = localStorage.getItem("id");
        axios.get('/api/agreedRequest/bestGuardianForDogs/' + offer.requestDogId, {
            "idReqDog": offer.requestDogId
        }).then(async response => {
            console.log(response)
            navigate('/bestRequest', { state:
            {
                bestRequest: response.data, reqDog: offer.requestDogId
            }
        })
        }).catch(err => {
            console.log(err);
            alert(err.response.data.message)
        })
    }

    
    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Moji oglasi</title>
            </Helmet>

            <Navbar/>

            <div className="profile-info background-blackolive">

                <div className="ro-page-content">
                    <div className='ro-bar'>
                        <span className='home-title'>
                            Moji Oglasi
                        </span>
                        <div className='ro-button-container'>
                            <a href="/offers/new" className='button-href'>
                                <button className="button button-gradient">Dodaj novi oglas</button>
                            </a>
                        </div>
                    </div>
                    <hr className='hr-color-apricot'/>

                    <div className='panel-container'>
                        {offers && offers.map(offer =>
                            <div className='panel-content background-white'>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Lokacija: </span>
                                    <span className='panel-info-item-value'>{offer.locationName}</span>
                                </div>
                                <div className='empty-space-small'/>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Početak: </span>
                                    <span className='panel-info-item-value'>{offer.dogTimeBegin.split("T")[0]}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'></span>
                                    {<span className='panel-info-item-value'>{offer.dogTimeBegin.split("T")[1].substring(0, offer.dogTimeBegin.split("T")[1].length - 10)}</span>}
                                </div>
                                <div className='empty-space-small'/>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Kraj: </span>
                                    <span className='panel-info-item-value'>{offer.dogTimeEnd.split("T")[0]}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'></span>
                                    {<span className='panel-info-item-value'>{offer.dogTimeEnd.split("T")[1].substring(0, offer.dogTimeEnd.split("T")[1].length - 10)}</span>}
                                </div>
                                <div className='empty-space-small'/>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Fleksibilno:  </span>
                                    <span className='panel-info-item-value'>{offer.flexible == true ? "Je" : "Nije"}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Iskustvo:  </span>
                                    <span className='panel-info-item-value'>{offer.hasDog == true ? "Ima" : "Nema"}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Ima li psa:  </span>
                                    <span className='panel-info-item-value'>{offer.hasExperience == true ? "Ima" : "Nema"}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Broj pasa: </span>
                                    <span className='panel-info-item-value'>{offer.numberOfDogs}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Željena starost: </span>
                                    <span className='panel-info-item-value'>{offer.dogAge}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Željena pasmina: </span>
                                    <span className='panel-info-item-value'>{offer.breed.name}</span>
                                </div>
                                <div className='empty-space-small'/>
                                <div className='profile-button-container'>
                                    <button className="button button-primary" onClick={() => FindBestRequest(offer)}>Najbolja ponuda</button>
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

export default MyOffers;