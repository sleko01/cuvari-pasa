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

function MyDogs(){
    const [dogs, setDogs] = React.useState([])


    function decrypt(password) {
        return CryptoJS.enc.Base64.parse(password).toString(CryptoJS.enc.Utf8);
    }


    React.useEffect(() => {
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        let id = localStorage.getItem('id')
        axios.get('/api/dogs/my/' + id, { headers : {'Authorization': basicAuth}}).then(response => {
            console.log(response.data);
            setDogs(response.data)
        }).catch(err => {
            if(localStorage.getItem("id") == undefined) window.location.href = "/users/login";
        })
    }, []);


    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Moji psi</title>
            </Helmet>

            <Navbar/>

            <div className="profile-info background-blackolive">
                <div className="ro-page-content">
                    <div className='ro-bar'>
                        <span className='home-title'>
                            Moji psi   
                        </span>
                        <div className='ro-button-container'>
                            <a href="/dogs/register" className='button-href'>
                                <button className="button button-gradient">Dodaj psa</button>
                            </a>
                        </div>
                    </div>
                    <hr className='hr-color-apricot'/>
                    <div className='panel-container'>
                        {dogs && dogs.map(dog =>
                            <div className='panel-content background-white'>
                                <div className='panel-info-item'>
                                    <img className={"dog-photo"} src={`${dog.photo}`}></img>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Ime: </span>
                                    <span className='panel-info-item-value'>{dog.name}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Vrsta: </span>
                                    <span className='panel-info-item-value'>{dog.breed.name}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Datum rođenja: </span>
                                    <span className='panel-info-item-value'>{dog.dateOfBirth}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Rating:  </span>
                                    <span className='panel-info-item-value'>{dog.ratingCount == 0 ? 0 : dog.ratingSum/dog.ratingCount}</span>
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

export default MyDogs;