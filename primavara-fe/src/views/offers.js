import React from 'react'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import './home.css'

function Offers(){
    const [requests, setRequests] = React.useState([])

    React.useEffect() //implementacija fetch metode za popis guardiana

    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Oglasi</title>
            </Helmet>

            <Navbar/>

            <table>
                <tbody>
                    {requests && requests.map(request =>
                        <tr key={request.requestGuardianId}>
                            <td>{request.location}</td>
                            <td>{request.numberOfDogs}</td>
                            <td>{request.guardianTimeBegin}-{request.guardianTimeEnd}</td>
                            <td>{request.hasDog}</td>
                            <td>{request.hasExperience}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Footer/>
        </div>

    )
}

export default Offers;