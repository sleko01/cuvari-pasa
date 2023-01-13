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
    let tempObject1 = {}
    let tempObject2 = {}
    let temp1 = {}
    let temp2 = {}

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
                                    tempObject1 = {
                                        "displayUser": response.data.appUser,
                                        "data": response.data
                                    }
                                    setGuardians(oldGuardians => ({...oldGuardians, [response.data.requestGuardianId]: tempObject1}))
                                })
                            } else {
                                tempObject1 = {
                                    "displayUser": response.data.appUser,
                                    "data": response.data
                                }
                                setDogs(oldDogs => ({...oldDogs, [response.data.requestDogId]: tempObject1}))
                            }
                        })
                    } else {
                        axios.get('/api/reqgua/get/' + t.requestGuardianId, {headers: {'Authorization': basicAuth}}).then(response =>{
                            temp1 = response.data
                            if (response.data.appUser.userId == id){
                                if (id ==t.initiatorUserId){
                                    axios.get("/api/users/profile/" + t.userId, { headers : {'Authorization': basicAuth}}).then(response => {
                                        tempObject1 = {
                                            "displayUser": response.data,
                                            "data": temp1
                                        }
                                        setGuardians(oldGuardians => ({...oldGuardians, [temp1.requestGuardianId]: tempObject1}))
                                    })
                                } else {
                                    axios.get("/api/users/profile/" +t.initiatorUserId, { headers : {'Authorization': basicAuth}}).then(response => {
                                        tempObject1 = {
                                            "displayUser": response.data,
                                            "data": temp1
                                        }
                                        setGuardians(oldGuardians => ({...oldGuardians, [temp1.requestGuardianId]: tempObject1}))
                                    })
                                }
                            } else {
                                tempObject1 = {
                                    "displayUser": response.data.appUser,
                                    "data": response.data
                                }
                                setGuardians(oldGuardians => ({...oldGuardians, [temp1.requestGuardianId]: tempObject1}))
                            }

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
                                axios.get('/api/reqdog/get/' + t.requestDogId, {headers: {'Authorization': basicAuth}}).then(response => {
                                    tempObject2 = {
                                        "displayUser": response.data.appUser,
                                        "data": response.data
                                    }
                                    setDogs(oldDogs => ({...oldDogs, [response.data.requestDogId]: tempObject2}))
                                })
                            } else {
                                tempObject2 = {
                                    "displayUser": response.data.appUser,
                                    "data": response.data
                                }
                                setGuardians(oldGuardians => ({...oldGuardians, [response.data.requestGuardianId]: tempObject2}))
                            }
                        })
                    } else {
                        axios.get('/api/reqdog/get/' + t.requestDogId, {headers: {'Authorization': basicAuth}}).then(response =>{
                            temp2 = response.data
                            if (response.data.appUser.userId == id){
                                if (id == t.initiatorUserId){
                                    axios.get("/api/users/profile/" + t.userId, { headers : {'Authorization': basicAuth}}).then(response => {
                                        tempObject2 = {
                                            "displayUser": response.data,
                                            "data": temp2
                                        }
                                        setDogs(oldDogs => ({...oldDogs, [temp2.requestDogId]: tempObject2}))
                                    })
                                } else {
                                    axios.get("/api/users/profile/" + t.initiatorUserId, { headers : {'Authorization': basicAuth}}).then(response => {
                                        tempObject2 = {
                                            "displayUser": response.data,
                                            "data": temp2
                                        }
                                        setDogs(oldDogs => ({...oldDogs, [temp2.requestDogId]: tempObject2}))
                                    })
                                }
                            } else {
                                tempObject2 = {
                                    "displayUser": response.data.appUser,
                                    "data": response.data
                                }
                                setDogs(oldDogs => ({...oldDogs, [temp2.requestDogId]: tempObject2}))
                            }
                        })
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
                                    <span className='panel-info-item-name'>Korisnik: </span>
                                    <span className='panel-info-item-value'>{dog.displayUser.username}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>E-mail: </span>
                                    <span className='panel-info-item-value'>{dog.displayUser.email}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Lokacija: </span>
                                    <span className='panel-info-item-value'>{dog.data.locationName}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Broj pasa: </span>
                                    <span className='panel-info-item-value'>{dog.data.numberOfDogs}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Početak: </span>
                                    <span className='panel-info-item-value'>{dog.data.dogTimeBegin.split("T")[0]}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'></span>
                                    {<span className='panel-info-item-value'>{dog.data.dogTimeBegin.split("T")[1].substring(0, dog.data.dogTimeBegin.split("T")[1].length - 10)}</span>}
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Kraj: </span>
                                    <span className='panel-info-item-value'>{dog.data.dogTimeEnd.split("T")[0]}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'></span>
                                    {<span className='panel-info-item-value'>{dog.data.dogTimeEnd.split("T")[1].substring(0, dog.data.dogTimeEnd.split("T")[1].length - 10)}</span>}
                                </div>
                            </div>

                        )}
                        {guardians && Object.entries(guardians).map(([key, guardian]) =>
                            <div className="panel-content background-white">
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Korisnik: </span>
                                    <span className='panel-info-item-value'>{guardian.displayUser.username}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>E-mail: </span>
                                    <span className='panel-info-item-value'>{guardian.displayUser.email}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Lokacija: </span>
                                    <span className='panel-info-item-value'>{guardian.data.locationName}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Broj pasa: </span>
                                    <span className='panel-info-item-value'>{guardian.data.numberOfDogs}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Početak: </span>
                                    <span className='panel-info-item-value'>{guardian.data.guardTimeBegin.split("T")[0]}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'></span>
                                    {<span className='panel-info-item-value'>{guardian.data.guardTimeBegin.split("T")[1].substring(0, guardian.data.guardTimeBegin.split("T")[1].length - 10)}</span>}
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Kraj: </span>
                                    <span className='panel-info-item-value'>{guardian.data.guardTimeEnd.split("T")[0]}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'></span>
                                    {<span className='panel-info-item-value'>{guardian.data.guardTimeEnd.split("T")[1].substring(0, guardian.data.guardTimeEnd.split("T")[1].length - 10)}</span>}
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