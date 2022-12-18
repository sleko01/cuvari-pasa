import React from 'react'
import axios from 'axios'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import './home.css'

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
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Oglasi</title>
            </Helmet>

            <Navbar/>

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

            <Footer/>
        </div>

    )
}

export default Offers;