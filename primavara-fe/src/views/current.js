import React from 'react'
import { Helmet } from 'react-helmet'

import '../styles/responsive.css'
import '../styles/home.css'
import '../styles/index.css'
import '../styles/moderation.css'
import '../styles/profile.css'
import '../styles/requestsAndOffers.css'
import Navbar from "./partials/navbar";
import CryptoJS from "crypto-js";
import axios from "axios";

function Current(){
    const [guardians, setGuardians] = React.useState([])
    const [dogs, setDogs] = React.useState([])
    let tempGuardians = []
    let tempDogs = []
    let tempGuardians1 = []
    let tempDogs1 = []

    function decrypt(password) {
        return CryptoJS.enc.Base64.parse(password).toString(CryptoJS.enc.Utf8);
    }

    React.useEffect(() => {
        let id = localStorage.getItem("id") == undefined ? "" : localStorage.getItem("id")
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        if (id != ""){
            axios.get('/api/agreedRequest/myInProgressGuardians/' + id,{headers: {'Authorization': basicAuth}}).then(response => {
                console.log(response.data)
                tempGuardians = response.data
                tempGuardians.forEach(t => {
                    if (t.requestDogId){
                        axios.get('/api/reqdog/get/' + t.requestDogId, {headers: {'Authorization': basicAuth}}).then(response => {
                            if (response.data.appUser.userId == id){
                                axios.get('/api/reqgua/get/' + t.requestGuardianId, {headers: {'Authorization': basicAuth}}).then(response =>{
                                    setGuardians(oldGuardians => ({...oldGuardians, [response.data.requestGuardianId]: response.data}))
                                })
                            } else {
                                setDogs(oldDogs => ({...oldDogs, [response.data.requestDogId]: response.data}))
                            }
                        })
                    } else {
                        axios.get('/api/reqgua/get/' + t.requestGuardianId, {headers: {'Authorization': basicAuth}}).then(response =>{
                            setGuardians(oldGuardians => ({...oldGuardians, [response.data.requestGuardianId]: response.data}))
                        })
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }, [])

    React.useEffect(() => {
        let id = localStorage.getItem("id") == undefined ? "" : localStorage.getItem("id")
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        if (id != ""){
            axios.get('/api/agreedRequest/myInProgressDogs/' + id, {headers: {'Authorization': basicAuth}}).then(response => {
                console.log(response.data)
                tempDogs = response.data
                tempDogs.forEach(t => {
                    if (t.requestGuardianId) {
                        axios.get('/api/reqgua/get/' + t.requestGuardianId, {headers: {'Authorization': basicAuth}}).then(response =>{
                            if (response.data.appUser.userId == id){
                                axios.get('/api/reqdog/get/' + t.requestDogId, {headers: {'Authorization': basicAuth}}).then(response =>
                                    setDogs(oldDogs => ({...oldDogs, [response.data.requestDogId]: response.data}))
                                )
                            } else {
                                setGuardians(oldGuardians => ({...oldGuardians, [response.data.requestGuardianId]: response.data}))
                            }
                        })
                    } else {
                        axios.get('/api/reqdog/get/' + t.requestDogId, {headers: {'Authorization': basicAuth}}).then(response =>
                            setDogs(oldDogs => ({...oldDogs, [response.data.requestDogId]: response.data}))
                        )
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }, [])


    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Čuvanja u tijeku</title>
            </Helmet>

            <Navbar/>

            <div className="profile-info background-blackolive">
                <div className="ro-page-content">
                    <div className='ro-bar'>
                        <span className='home-title'>
                            Čuvanja u tijeku
                        </span>
                    </div>
                    <hr className='hr-color-apricot'/>

                    <div className='panel-container'>
                        {dogs && Object.entries(dogs).map(([key, dog]) =>
                            <div className="panel-content background-white">
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Lokacija: </span>
                                    <span className='panel-info-item-value'>{dog.locationName}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Broj pasa: </span>
                                    <span className='panel-info-item-value'>{dog.numberOfDogs}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Početak: </span>
                                    <span className='panel-info-item-value'>{dog.dogTimeBegin.split("T")[0]}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'></span>
                                    {<span className='panel-info-item-value'>{dog.dogTimeBegin.split("T")[1].substring(0, dog.dogTimeBegin.split("T")[1].length - 10)}</span>}
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Kraj: </span>
                                    <span className='panel-info-item-value'>{dog.dogTimeEnd.split("T")[0]}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'></span>
                                    {<span className='panel-info-item-value'>{dog.dogTimeEnd.split("T")[1].substring(0, dog.dogTimeEnd.split("T")[1].length - 10)}</span>}
                                </div>
                            </div>
                        )}
                        {guardians && Object.entries(guardians).map(([key, guardian]) =>
                            <div className="panel-content background-white">
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Lokacija: </span>
                                    <span className='panel-info-item-value'>{guardian.locationName}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Broj pasa: </span>
                                    <span className='panel-info-item-value'>{guardian.numberOfDogs}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Početak: </span>
                                    <span className='panel-info-item-value'>{guardian.guardTimeBegin.split("T")[0]}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'></span>
                                    {<span className='panel-info-item-value'>{guardian.guardTimeBegin.split("T")[1].substring(0, guardian.guardTimeBegin.split("T")[1].length - 10)}</span>}
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Kraj: </span>
                                    <span className='panel-info-item-value'>{guardian.guardTimeEnd.split("T")[0]}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'></span>
                                    {<span className='panel-info-item-value'>{guardian.guardTimeEnd.split("T")[1].substring(0, guardian.guardTimeEnd.split("T")[1].length - 10)}</span>}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Current;