import React from 'react'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import './home.css'

function MyDogRequests(){
    const [requests, setRequests] = React.useState([])

    React.useEffect() //implementacija fetch metode za popis pesa

    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Naslovnica</title>
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
                    </tr>
                )}
                </tbody>
            </table>

            <Footer/>
        </div>

    )
}

export default MyDogRequests;