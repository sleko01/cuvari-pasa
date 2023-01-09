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
    const [guardians, setGuardians] = React.useState()
    const [dogs, setDogs] = React.useState()

    function decrypt(password) {
        return CryptoJS.enc.Base64.parse(password).toString(CryptoJS.enc.Utf8);
    }

    React.useEffect(() => {
        let id = localStorage.getItem("id") == undefined ? "" : localStorage.getItem("id")
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));
        if (id != ""){
            axios.get('/api/agreedRequest/myInProgressGuardians/' + id,{headers: {'Authorization': basicAuth}}).then(response => {
                    console.log(response.data)
                    setGuardians(response.data)
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
                setDogs(response.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [])

    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Oglasi</title>
            </Helmet>


            <Navbar/>

        </div>
    )
}

export default Current;