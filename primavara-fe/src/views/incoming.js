import React from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import '../styles/responsive.css'
import '../styles/home.css'
import '../styles/index.css'
import '../styles/moderation.css'
import '../styles/profile.css'
import '../styles/requestsAndOffers.css'
import {NativeSelect} from "@mui/material";

function Incoming(){
    const [offers, setOffers] = React.useState()
    const [unratedGuardians, setUnratedGuardians] = React.useState()
    const [unratedDogs, setUnratedDogs] = React.useState()
    const [userRatings, setUserRatings] = React.useState({})
    const [dogRatings, setDogRatings] = React.useState({})
    let offersPending = []
    let dogsTemp = []
    let unratedDogsTemp = []
    let unratedGuardiansTemp = []
    let temp = ""
    let dogsTemp1 = []

    function decrypt(password) {
        return CryptoJS.enc.Base64.parse(password).toString(CryptoJS.enc.Utf8);
    }

    React.useEffect(() => {
        let id = localStorage.getItem('id');
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        axios.get('/api/agreedRequest/myOfferings/' + id, { headers : {'Authorization': basicAuth}}).then(response => {
            console.log(response.data);
            for (const [key, value] of Object.entries(response.data)){
                offersPending.push(value)
            }
            setOffers(offersPending)
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

    React.useEffect(() => {
        let id = localStorage.getItem('id');
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        axios.get('/api/agreedRequest/myRatedGuardians/' + id, { headers : {'Authorization': basicAuth}}).then(response => {
            //console.log(response.data);
            unratedGuardiansTemp = []
            let tempObject
            for (const [key, value] of Object.entries(response.data)){
                if (id == value.initiatorUserId && !value.initiatorRated) {
                    axios.get("/api/reqgua/getDogsInRequest/" + value.requestId, { headers : {'Authorization': basicAuth}}).then(response => {
                        dogsTemp = []
                        response.data.forEach(dogId => {
                            axios.get("/api/dogs/dog/" + dogId, { headers : {'Authorization': basicAuth}}).then(response => {
                                dogsTemp.push(response.data)
                                temp = value.requestId.toString() + "_" + dogId.toString()
                                setDogRatings(oldDogRatings => ({...oldDogRatings, [temp]: -1}))
                            })
                        })
                    }).then(() => {
                        axios.get("/api/users/profile/" + value.userId, { headers : {'Authorization': basicAuth}}).then(response => {
                            tempObject = {
                                "userId": value.userId,
                                "username": response.data.username,
                                "dogs": dogsTemp,
                                "requestId": value.requestId
                            }
                            unratedGuardiansTemp.push(tempObject)
                        })
                    })
                } else if (id == value.userId && !value.userRated) {
                    axios.get("/api/users/profile/" + value.initiatorUserId, { headers : {'Authorization': basicAuth}}).then(response => {
                        tempObject = {
                            "userId": value.initiatorUserId,
                            "username": response.data.username,
                            "dogs": null,
                            "requestId": value.requestId
                        }
                        temp = value.requestId.toString() + "_" + value.initiatorUserId.toString()
                        setUserRatings(oldUserRatings => ({...oldUserRatings, [temp]: -1}))
                        unratedGuardiansTemp.push(tempObject)
                    })
                }
            }
            console.log(unratedGuardiansTemp)
            setUnratedDogs(unratedGuardiansTemp)

        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

    React.useEffect(() => {
        let id = localStorage.getItem('id');
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        axios.get('/api/agreedRequest/myRatedDogs/' + id, { headers : {'Authorization': basicAuth}}).then(response => {
            //console.log(response.data)
            unratedDogsTemp = []
            let tempObject
            for (const [key, value] of Object.entries(response.data)){
                if (id == value.userId && !value.userRated) {
                    axios.get("/api/dogs/my/" + value.initiatorUserId, { headers : {'Authorization': basicAuth}}).then(response => {
                        dogsTemp1 = response.data
                        axios.get("/api/users/profile/" + value.initiatorUserId, { headers : {'Authorization': basicAuth}}).then(response => {
                            tempObject = {
                                "userId": value.initiatorUserId,
                                "username": response.data.username,
                                "dogs": dogsTemp1,
                                "requestId": value.requestId
                            }
                            dogsTemp1.forEach(dog => {
                                temp = value.requestId.toString() + "_" + dog.dogId.toString()
                                setDogRatings(oldDogRatings => ({...oldDogRatings, [temp]: -1}))
                            })
                            unratedDogsTemp.push(tempObject)
                            })
                    })
                } else if (id == value.initiatorUserId && !value.initiatorRated) {
                    axios.get("/api/users/profile/" + value.userId, { headers : {'Authorization': basicAuth}}).then(response => {
                        tempObject = {
                            "userId": value.userId,
                            "username": response.data.username,
                            "dogs": null,
                            "requestId": value.requestId
                        }
                        temp = value.requestId.toString() + "_" + value.userId.toString()
                        setUserRatings(oldUserRatings => ({...oldUserRatings, [temp]: -1}))
                        unratedDogsTemp.push(tempObject)
                    })

                }
            }
            console.log(unratedDogsTemp)
            setUnratedGuardians(unratedDogsTemp)
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);
    function onChangeGuardians(e){
        const {name, value} = e.target;
        setUserRatings(oldUserRatings => ({...oldUserRatings, [name]:value}))
    }
    function onChangeDogs(e){
        const {name, value} = e.target;
        setDogRatings(oldDogRatings => ({...oldDogRatings, [name]:value}))
    }
    function rateUser(reqId, userId, a){
        let idOfUser = localStorage.getItem('id');
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        console.log(reqId)
        console.log(userId)
        console.log(a);
        console.log(userRatings)
        for (const key in userRatings) {
            let temp = key.split("_")
            // console.log(temp)
            if (temp[0] == reqId) {
                axios.post('/api/users/rate/' + idOfUser + '/' + a.userId + '/' + a.requestId + '/' + userRatings[key] + '/g', { headers : {'Authorization': basicAuth}})
                .then(response => {
                    console.log(response)
                }).catch(err => {
                    axios.post('/api/users/rate/' + idOfUser + '/' + a.userId + '/' + a.requestId + '/' + userRatings[key] + '/d', { headers : {'Authorization': basicAuth}}).then(response => {
                        console.log(response)
                    }).catch(err => {
                        if(localStorage.getItem("id") == undefined) window.location.href = "/users/login";
                        alert(err.response.data.message);
                    })
                })
            }
        }
    }


    function rateDog(reqId, a){
        let idOfUser = localStorage.getItem('id');
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        console.log(a)
        console.log(reqId)
        console.log(dogRatings);
        let listId = [], listValue = [];

        for (const key in dogRatings) {

            // console.log(`${key}: ${dogRatings[key]}`);
            let temp = key.split("_")
            // console.log(temp)
            if (temp[0] == reqId) {
                listId.push(temp[1])
                listValue.push(dogRatings[key])
            }
        }
        console.log(listId)
        console.log(listValue)
        console.log(a)
        
        axios.post('/api/dogs/rate/' + a.userId + '/' + idOfUser + '/' + a.requestId + '/d', {
            "listId": listId,
            "listValue": listValue
        }, { headers : {'Authorization': basicAuth}}).then(response => {
            console.log(response)
        }).catch(err => {
            axios.post('/api/dogs/rate/' + a.userId + '/' + idOfUser + '/' + a.requestId + '/g', {
                "listId": listId,
                "listValue": listValue
            }, { headers : {'Authorization': basicAuth}}).then(response => {
                console.log(response)
            }).catch(err => {
                alert(err.response.data.message)
                if(localStorage.getItem("id") == undefined) window.location.href = "/users/login";
            })
        })


    }


    function acceptRequest(offer) {
        let idOfUser = localStorage.getItem('id')
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        if (offer.requestDog && offer.requestGuardian) {
            if (offer.requestDog.appUser.userId == localStorage.getItem('id')){
                axios.post('/api/agreedRequest/respond/' + offer.requestGuardian.appUser.userId + '/' + idOfUser + '/' + offer.requestGuardian.requestGuardianId + '/1/g', { headers : {'Authorization': basicAuth}}).then(response => {
                    window.alert("Uspješno prihvaćeno!")
                    window.location.reload();
                    console.log(response);
                }).catch(err => {
                    console.log(err)
                })
            } else {
                axios.post('/api/agreedRequest/respond/' + offer.requestDog.appUser.userId + '/' + idOfUser + '/' + offer.requestDog.requestDogId + '/1/d', { headers : {'Authorization': basicAuth}}).then(response => {
                    window.alert("Uspješno prihvaćeno!")
                    window.location.reload();
                    console.log(response);
                }).catch(err => {
                    console.log(err)
                })
            }
        }
        else {
            console.log(offer)
            console.log(offer.initiator_user.userId)
            let type = offer.requestDog == undefined ? "g" : "d"
            let requestType = type == "g" ? offer.requestGuardian.requestGuardianId : offer.requestDog.requestDogId
            console.log(requestType)
            // console.log(type)
            let idOfUser = localStorage.getItem('id');
            if (type == "d") {
                axios.post('/api/agreedRequest/respond/' + offer.initiator_user.userId + '/' + idOfUser + '/' + requestType + '/1/' + type, {
                    "idInitiator": offer.initiator_user.userId,
                    "idUser": idOfUser,
                    "idReqDog": offer.requestDog.requestDogId,
                    "value": 1
                }, { headers : {'Authorization': basicAuth}}).then((response) => {
                    window.alert("Uspješno prihvaćeno!")
                    window.location.reload();
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
            } else {
                axios.post('/api/agreedRequest/respond/' + offer.initiator_user.userId + '/' + idOfUser + '/' + requestType + '/1/' + type, {
                    "idInitiator": offer.initiator_user.userId,
                    "idUser": idOfUser,
                    "idReqGua": offer.requestGuardian.requestGuardianId,
                    "value": 1
                }, { headers : {'Authorization': basicAuth}}).then((response) => {
                    window.alert("Uspješno prihvaćeno!")
                    window.location.reload();
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
            }
        }
        
        
    }

    function denyRequest(offer) {
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        let idOfUser = localStorage.getItem('id')
        if (offer.requestDog && offer.requestGuardian) {
            if (offer.requestDog.appUser.userId == localStorage.getItem('id')){
                axios.post('/api/agreedRequest/respond/' + offer.requestGuardian.appUser.userId + '/' + idOfUser + '/' + offer.requestGuardian.requestGuardianId + '/0/g', { headers : {'Authorization': basicAuth}}).then(response => {
                    window.alert("Uspješno odbijeno!")
                    window.location.reload();
                    console.log(response);
                }).catch(err => {
                    console.log(err)
                })
            } else {
                axios.post('/api/agreedRequest/respond/' + offer.requestDog.appUser.userId + '/' + idOfUser + '/' + offer.requestDog.requestDogId + '/0/d', { headers : {'Authorization': basicAuth}}).then(response => {
                    window.alert("Uspješno odbijeno!")
                    window.location.reload();
                    console.log(response);
                }).catch(err => {
                    console.log(err)
                })
            }
        }
        else {
            console.log(offer)
            console.log(offer.initiator_user.userId)
            let type = offer.requestDog == undefined ? "g" : "d"
            let requestType = type == "g" ? offer.requestGuardian.requestGuardianId : offer.requestDog.requestDogId
            console.log(requestType)
            // console.log(type)
            let idOfUser = localStorage.getItem('id');
            if (type == "d") {
                axios.post('/api/agreedRequest/respond/' + offer.initiator_user.userId + '/' + idOfUser + '/' + requestType + '/0/' + type, {
                    "idInitiator": offer.initiator_user.userId,
                    "idUser": idOfUser,
                    "idReqDog": offer.requestDog.requestDogId,
                    "value": 0
                }, { headers : {'Authorization': basicAuth}}).then((response) => {
                    window.alert("Uspješno odbijeno!")
                    window.location.reload();
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
            } else {
                axios.post('/api/agreedRequest/respond/' + offer.initiator_user.userId + '/' + idOfUser + '/' + requestType + '/0/' + type, {
                    "idInitiator": offer.initiator_user.userId,
                    "idUser": idOfUser,
                    "idReqGua": offer.requestGuardian.requestGuardianId,
                    "value": 0
                }, { headers : {'Authorization': basicAuth}}).then((response) => {
                    window.alert("Uspješno odbijeno!")
                    window.location.reload();
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
            }
        }
        
        
    }

    function displayOffer(offer){
        if (offer.requestGuardian && offer.requestDog) {
            if (offer.requestGuardian.appUser.userId == localStorage.getItem('id')) {
                return(
                    <div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Tip: </span>
                            <span className='panel-info-item-value'>Oglas</span>
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Korisnik: </span>
                            <span className='panel-info-item-value'>{offer.requestDog.appUser.username}</span>
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Lokacija: </span>
                            <span className='panel-info-item-value'>{offer.requestDog.locationName}</span>
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Početak: </span>
                            <span className='panel-info-item-value'>{offer.requestDog.dogTimeBegin.split("T")[0]}</span>
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'></span>
                            {<span className='panel-info-item-value'>{offer.requestDog.dogTimeBegin.split("T")[1].substring(0, offer.requestDog.dogTimeBegin.split("T")[1].length - 10)}</span>}
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Kraj: </span>
                            <span className='panel-info-item-value'>{offer.requestDog.dogTimeEnd.split("T")[0]}</span>
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'></span>
                            {<span className='panel-info-item-value'>{offer.requestDog.dogTimeEnd.split("T")[1].substring(0, offer.requestDog.dogTimeEnd.split("T")[1].length - 10)}</span>}
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Ima psa:</span>
                            {<span className='panel-info-item-value'>{offer.requestDog.appUser.hasDog ? "Ima" : "Nema"}</span>}
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Ima iskustva:</span>
                            {<span className='panel-info-item-value'>{offer.requestDog.appUser.hasExperience ? "Ima" : "Nema"}</span>}
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Ocjena:</span>
                            {<span className='panel-info-item-value'>{offer.requestDog.appUser.ratingCount==0 ? 0 : offer.requestDog.appUser.ratingSum/offer.requestDog.appUser.ratingCount}</span>}
                        </div>
                        <div className="empty-space"></div>
                        <div className='profile-button-container-centered'>
                            <button className="button button-primary" onClick={() => acceptRequest(offer)}>Prihvati</button>
                            <button className="button button-primary" onClick={() => denyRequest(offer)}>Odbij</button>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Tip: </span>
                            <span className='panel-info-item-value'>Zahtjev</span>
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Korisnik: </span>
                            <span className='panel-info-item-value'>{offer.requestGuardian.appUser.username}</span>
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Lokacija: </span>
                            <span className='panel-info-item-value'>{offer.requestGuardian.locationName}</span>
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Početak: </span>
                            <span className='panel-info-item-value'>{offer.requestGuardian.guardTimeBegin.split("T")[0]}</span>
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'></span>
                            {<span className='panel-info-item-value'>{offer.requestGuardian.guardTimeBegin.split("T")[1].substring(0, offer.requestGuardian.guardTimeBegin.split("T")[1].length - 10)}</span>}
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Kraj: </span>
                            <span className='panel-info-item-value'>{offer.requestGuardian.guardTimeEnd.split("T")[0]}</span>
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'></span>
                            {<span className='panel-info-item-value'>{offer.requestGuardian.guardTimeEnd.split("T")[1].substring(0, offer.requestGuardian.guardTimeEnd.split("T")[1].length - 10)}</span>}
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Ima psa:</span>
                            {<span className='panel-info-item-value'>{offer.requestGuardian.appUser.hasDog ? "Ima" : "Nema"}</span>}
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Ima iskustva:</span>
                            {<span className='panel-info-item-value'>{offer.requestGuardian.appUser.hasExperience ? "Ima" : "Nema"}</span>}
                        </div>
                        <div className='panel-info-item'>
                            <span className='panel-info-item-name'>Ocjena:</span>
                            {<span className='panel-info-item-value'>{offer.requestGuardian.appUser.ratingCount==0 ? 0 : offer.requestGuardian.appUser.ratingSum/offer.requestGuardian.appUser.ratingCount}</span>}
                        </div>
                        <div className="empty-space"></div>
                        <div className='profile-button-container-centered'>
                            <button className="button button-primary" onClick={() => acceptRequest(offer)}>Prihvati</button>
                            <button className="button button-primary" onClick={() => denyRequest(offer)}>Odbij</button>
                        </div>
    
                    </div>
                )
            }
        }
        else if (offer.requestGuardian){
            return (
                <div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Tip: </span>
                        <span className='panel-info-item-value'>Zahtjev</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Korisnik: </span>
                        <span className='panel-info-item-value'>{offer.initiator_user.username}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Lokacija: </span>
                        <span className='panel-info-item-value'>{offer.requestGuardian.locationName}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Početak: </span>
                        <span className='panel-info-item-value'>{offer.requestGuardian.guardTimeBegin.split("T")[0]}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'></span>
                        {<span className='panel-info-item-value'>{offer.requestGuardian.guardTimeBegin.split("T")[1].substring(0, offer.requestGuardian.guardTimeBegin.split("T")[1].length - 10)}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Kraj: </span>
                        <span className='panel-info-item-value'>{offer.requestGuardian.guardTimeEnd.split("T")[0]}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'></span>
                        {<span className='panel-info-item-value'>{offer.requestGuardian.guardTimeEnd.split("T")[1].substring(0, offer.requestGuardian.guardTimeEnd.split("T")[1].length - 10)}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Ima psa:</span>
                        {<span className='panel-info-item-value'>{offer.initiator_user.hasDog ? "Ima" : "Nema"}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Ima iskustva:</span>
                        {<span className='panel-info-item-value'>{offer.initiator_user.hasExperience ? "Ima" : "Nema"}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Ocjena:</span>
                        {<span className='panel-info-item-value'>{offer.initiator_user.ratingCount==0 ? 0 : offer.initiator_user.ratingSum/offer.initiator_user.ratingCount}</span>}
                    </div>
                    <div className="empty-space"></div>
                    <div className='profile-button-container-centered'>
                        <button className="button button-primary" onClick={() => acceptRequest(offer)}>Prihvati</button>
                        <button className="button button-primary" onClick={() => denyRequest(offer)}>Odbij</button>
                    </div>

                </div>
            )
        } else if (offer.requestDog){
            return(
                <div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Tip: </span>
                        <span className='panel-info-item-value'>Oglas</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Korisnik: </span>
                        <span className='panel-info-item-value'>{offer.initiator_user.username}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Lokacija: </span>
                        <span className='panel-info-item-value'>{offer.requestDog.locationName}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Početak: </span>
                        <span className='panel-info-item-value'>{offer.requestDog.dogTimeBegin.split("T")[0]}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'></span>
                        {<span className='panel-info-item-value'>{offer.requestDog.dogTimeBegin.split("T")[1].substring(0, offer.requestDog.dogTimeBegin.split("T")[1].length - 10)}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Kraj: </span>
                        <span className='panel-info-item-value'>{offer.requestDog.dogTimeEnd.split("T")[0]}</span>
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'></span>
                        {<span className='panel-info-item-value'>{offer.requestDog.dogTimeEnd.split("T")[1].substring(0, offer.requestDog.dogTimeEnd.split("T")[1].length - 10)}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Ima psa:</span>
                        {<span className='panel-info-item-value'>{offer.initiator_user.hasDog ? "Ima" : "Nema"}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Ima iskustva:</span>
                        {<span className='panel-info-item-value'>{offer.initiator_user.hasExperience ? "Ima" : "Nema"}</span>}
                    </div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Ocjena:</span>
                        {<span className='panel-info-item-value'>{offer.initiator_user.ratingCount==0 ? 0 : offer.initiator_user.ratingSum/offer.initiator_user.ratingCount}</span>}
                    </div>
                    <div className="empty-space"></div>
                    <div className='profile-button-container-centered'>
                        <button className="button button-primary" onClick={() => acceptRequest(offer)}>Prihvati</button>
                        <button className="button button-primary" onClick={() => denyRequest(offer)}>Odbij</button>
                    </div>
                </div>
            )
        }
    }

    function displayRating(a) {
        if (a.dogs){
            return(
                <div>
                    {a.dogs.map(dog =>
                        <div>
                            <div className='panel-info-item'>
                                <span className='panel-info-item-name'>Pas: </span>
                                <span className='panel-info-item-value'>{dog.name}</span>
                            </div>
                            <div className='panel-info-item'>
                                <NativeSelect
                                    inputProps={{
                                        name:a.requestId.toString() + "_" + dog.dogId.toString(),
                                        id: "rating" + a.requestId.toString() + "_" + dog.name
                                    }}
                                    required
                                    onChange = {onChangeDogs}
                                    value = {dogRatings[a.requestId.toString() + "_" + dog.dogId.toString()]}
                                >
                                    <option value={-1}>Ne želim ocijeniti</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </NativeSelect>
                            </div>
                            <div className='empty-space-small'></div>
                            <div className='profile-button-container-centered'>
                                <button className="button button-primary" onClick={() => rateDog(a.requestId, dog.dogId)}>Ocijeni</button>
                            </div>
                        </div>
                    )}
                </div>
            )
        } else {
            return(
                <div>
                    <div className='panel-info-item'>
                        <span className='panel-info-item-name'>Korisnik: </span>
                        <span className='panel-info-item-value'>{a.username}</span>
                    </div>
                    <div className='panel-info-item'>
                        <NativeSelect
                            inputProps={{
                                name:a.requestId.toString() + "_" + a.userId.toString(),
                                id: "rating" + a.requestId.toString() + "_" + a.username
                            }}
                            required
                            onChange = {onChangeGuardians}
                            value = {userRatings[a.requestId.toString() + "_" + a.userId.toString()]}
                        >
                            <option value={-1}>Ne želim ocijeniti</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </NativeSelect>
                    </div>
                    <div className='empty-space-small'></div>
                    <div className='profile-button-container-centered'>
                        <button className="button button-primary" onClick={() => rateUser(a.requestId, a.userId)}>Ocijeni</button>
                    </div>
                </div>)
        }
    }

    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Pristigle ponude</title>
            </Helmet>

            <Navbar/>

            <div className="profile-info background-blackolive">

                <div className="ro-page-content">
                    <div className='ro-bar'>
                        <span className='home-title'>
                            Pristigle ponude
                        </span>
                    </div>
                    <hr className='hr-color-apricot'/>

                    <div className='panel-container'>
                        {offers && offers.map(offerType =>
                            offerType && offerType.map(offer =>
                                <div className="panel-content background-white">
                                    {displayOffer(offer)}
                                </div>
                            )
                        )}
                    </div>

                </div>

                <div className="ro-page-content">
                    <div className='ro-bar'>
                        <span className='home-title'>
                            Povijest ponuda
                        </span>
                    </div>
                    <hr className='hr-color-apricot'/>

                    <div className='panel-container'>
                        {unratedDogs && unratedDogs.map(dogs=>
                            <div className="panel-content background-white">
                                {displayRating(dogs)}
                            </div>
                        )}
                        {unratedGuardians && unratedGuardians.map(guardian =>
                            <div className="panel-content background-white">
                                {displayRating(guardian)}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <Footer/>
        </div>

    )
}

export default Incoming;