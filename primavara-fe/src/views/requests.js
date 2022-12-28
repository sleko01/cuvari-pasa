import React from 'react'
import axios from 'axios'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import './home.css'

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
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Zahtjevi</title>
            </Helmet>

            <Navbar/>

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

            <Footer/>
        </div>

    )
}

export default Requests;