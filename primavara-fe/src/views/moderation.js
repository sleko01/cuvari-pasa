import React from 'react'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import './home.css'

function Moderation(){
    const [pendingRequests, setPendingRequests] = React.useState([])
    const [users, setUsers] = React.useState([])

    React.useEffect() //vjerojatno treba 2 fetcha za requestove i usere

    function approveRequest()
    function denyRequest()
    function blockUser()
    function addAdmin()

    return (
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
                        <td><button onClick={approveRequest()}>Odobri</button></td>
                        <td><button onClick={denyRequest()}>Odbij</button></td>
                    </tr>
                )}
                </tbody>
            </table>


            <table>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.userId}>
                            <td>{user.username}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td><button onClick={blockUser()}>Blokiraj</button></td>
                            <td><button onClick={addAdmin()}>Dodaj admina</button></td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Footer/>
        </div>
    )
}

export default Moderation;