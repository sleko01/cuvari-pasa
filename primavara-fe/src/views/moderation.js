import React from 'react'
import axios from 'axios'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import '../styles/home.css'
import '../styles/index.css'

function Moderation(){
    const [pendingRequests, setPendingRequests] = React.useState([])
    const [users, setUsers] = React.useState([])


    // function approveRequest()
    // function denyRequest()
    function blockUser(id){
        console.log(id)
    }
    function addAdmin(id){
        console.log(id)
    }

    React.useEffect(() => {
        let id = localStorage.getItem('id');
        axios.get('/api/users/moderation/' + id + '/r').then(response => {
            console.log(response.data);
            setPendingRequests(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

    React.useEffect(() => {
        let id = localStorage.getItem('id');
        axios.get('/api/users/moderation/' + id + '/u').then(response => {
            console.log(response.data);
            setUsers(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

    return (
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Naslovnica</title>
            </Helmet>

            <Navbar/>
            <table>
                <tbody>
                {pendingRequests.length > 0 && pendingRequests.map(request =>
                    <tr key={request.requestDogId}>
                        <td>{request.dogAge}</td>
                        <td>{request.numberOfDogs}</td>
                        <td>{request.dogTimeBegin}-{request.dogTimeEnd}</td>
                        <td>{request.isFlexible}</td>
                        <td>{request.location}</td>
                        {/*<td><button onClick={approveRequest()}>Odobri</button></td>*/}
                        {/*<td><button onClick={denyRequest()}>Odbij</button></td>*/}
                    </tr>
                )}
                </tbody>
            </table>


            <table>
                <tbody>
                    {users.length > 0 && users.map(user =>
                        <tr key={user.userId}>
                            <td>{user.username}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td><button onClick={blockUser(user.userId)}>Blokiraj</button></td>
                            <td><button onClick={addAdmin(user.userId)}>Dodaj admina</button></td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Footer/>
        </div>
    )
}

export default Moderation;