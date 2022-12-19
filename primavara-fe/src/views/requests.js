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
        axios.get('/api/reqdog').then(response => {
            console.log(response.data);
            setRequests(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

    return(
        <div className="ro-page-container">
            <Helmet>
                <title>CuvariPasa | Zahtjevi</title>
            </Helmet>

            <Navbar/>

            <div className="ro-section-container background-blackolive">
                
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
                    

                    <div className='ro-table-container background-white'>
                        <table>
                            <tbody>
                                {requests && requests.map(request =>
                                <tr key={request.requestDogId}>
                                <td>{request.dogAge}</td>
                                <td>{request.numberOfDogs}</td>
                                <td>{request.dogTimeBegin}-{request.dogTimeEnd}</td>
                                <td>{request.isFlexible}</td>
                                <td>{request.location}</td>
                                <td>{request.user_id}</td>
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

export default Requests;