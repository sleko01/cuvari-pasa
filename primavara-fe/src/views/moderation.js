import React from 'react'
import axios from 'axios'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import '../styles/home.css'
import '../styles/index.css'
import '../styles/moderation.css'

function Moderation(){
    const [pendingRequests, setPendingRequests] = React.useState([])
    const [users, setUsers] = React.useState([])


    // function approveRequest()
    // function denyRequest()
    function blockUser(id){
        console.log("blockUser");
        axios.post('/api/users/moderation/block/' + id, {
            "id": id
        }).then((response) => {
            window.alert("Uspješno blokirano!")
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }
    function addAdmin(id){
        console.log("addAdmin")
        axios.post('/api/users/moderation/give-admin/' + id, {
            "id": id
        }).then((response) => {
            window.alert("Uspješno davanje admina!")
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
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
            {(pendingRequests.length > 0 &&
                <div className='container'>
                    <table className='request-table'>
                        <th>Zahtjev</th>
                        <th>Godine psa</th>
                        <th>Broj pasa</th>
                        <th>Fleksibilno?</th>
                        <th>Lokacija</th>
                        <tbody>
                        {pendingRequests.map(request =>
                            <tr key={request.requestDogId}>
                                <td>{request.dogAge}</td>
                                <td>{request.numberOfDogs}</td>
                                <td>{request.dogTimeBegin}-{request.dogTimeEnd}</td>
                                <td>{request.isFlexible}</td>
                                <td>{request.location}</td>
                                {/* <td className='confirm-button'><button className="button-primary button button-size" onClick={approveRequest()}>Odobri</button></td>
                                    <td className="deny-button"><button className="button-primary button button-size" onClick={denyRequest()}>Odbij</button></td> */}
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
            {(users.length > 0 &&
                <div className='container'>
                    <table className='user-table'>
                        <th>Username</th>
                        <th>Ime i prezime</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                        <tbody>
                        {users.map(user =>
                            <tr key={user.userId}>
                                <td>{user.username}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td className='block-button'><button className="button-primary button button-size" onClick={() => blockUser(user.userId)}>Blokiraj</button></td>
                                <td className='admin-button'><button className="button-primary button button-size" onClick={() => addAdmin(user.userId)}>Dodaj admina</button></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            <Footer/>
        </div>
    )
}

export default Moderation;