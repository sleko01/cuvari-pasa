import React from 'react'
import axios from 'axios'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import '../styles/home.css'
import '../styles/index.css'

function MyRequests(){
    const [requests, setRequests] = React.useState([])

    React.useEffect(() => {
        let id = localStorage.getItem('id');
        axios.get('/api/reqgua/my/' + id).then(response => {
            console.log(response.data);
            setRequests(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Moji oglasi</title>
            </Helmet>

            <Navbar/>

            <table>
                <tbody>
                {requests && requests.map(request =>
                    <tr key={request.requestGuardianId}>
                        <td>{request.location}</td>
                        <td>{request.numberOfDogs}</td>
                        <td>{request.guardTimeBegin}-{request.guardTimeEnd}</td>
                        <td>{request.hasDog==true ? "true" : "false"}</td>
                        <td>{request.hasExperience == true? "true" : "false"}</td>
                    </tr>
                )}
                </tbody>
            </table>

            <Footer/>
        </div>

    )
}

export default MyRequests;