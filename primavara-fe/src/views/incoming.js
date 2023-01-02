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
    const [offers, setOffers] = React.useState([])

    //React.useEffect

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
                        {//tu ispisat sve prema tome koje je vrste zahtjev (ukrast iz myOffer/myRequests)
                        }
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