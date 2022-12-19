import React from 'react'
import axios from 'axios'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import '../styles/home.css'
import '../styles/index.css'

function Offers(){
    const [offers, setOffers] = React.useState([])

    React.useEffect(() => {
        axios.get('/api/reqgua').then(response => {
            console.log(response.data);
            setOffers(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

    return(
        <div className="ro-page-container">
            <Helmet>
                <title>CuvariPasa | Oglasi</title>
            </Helmet>

            <Navbar/>

            <div className="ro-section-container background-blackolive">
                
                <div className="ro-page-content">
                    <div className='ro-bar'>
                        <span className='home-title'>
                            Oglasi   
                        </span>
                        <div className='ro-button-container'>
                            <a href="/offers/new" className='button-href'>
                                <button className="button button-gradient">Dodaj novi oglas</button>
                            </a>
                        </div>
                    </div>
                    

                    <div className='ro-table-container background-white'>
                        <table>
                            <tbody>
                                {offers && offers.map(offer =>
                                <tr key={offer.requestGuardianId}>
                                <td>{offer.location}</td>
                                <td>{offer.numberOfDogs}</td>
                                <td>{offer.guardTimeBegin}-{offer.guardTimeEnd}</td>
                                <td>{offer.hasDog == true ? "true" : "false"}</td>
                                <td>{offer.hasExperience == true ? "true" : "false"}</td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            

            

            <Footer/>
        </div>



    )
}

export default Offers;