import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import PasswordChecklist from "react-password-checklist"
import Footer from './partials/footer'
import Navbar from './partials/navbar'
import '../styles/home.css'
import '../styles/index.css'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NativeSelect from '@mui/material/NativeSelect';
import { alpha, styled } from '@mui/material/styles';
import axios, {AxiosError} from "axios";


import Geocode from "react-geocode";
import {InputLabel} from "@mui/material";
Geocode.setApiKey("AIzaSyCzdvGwSbOBwq2GwrvNmJbeGWPDJTzCsLo")
Geocode.setRegion("hr");
Geocode.setLocationType("ROOFTOP");


const StyledTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'black',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'black',
        },
        '&:hover fieldset': {
            borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'black',
        },
    },
});

function NewOffer(){
    const [isDisabled, setIsDisabled] = useState(false)
    const [form, setForm] = React.useState({userId: localStorage.id, startDate: '',endDate: '', flexible: '', address: '', lat: '', lng: '', breed: 1, dogAge: '', numberOfDogs: ''})
    const [breeds, setBreeds] = React.useState([])
    const [user, setUser] = React.useState([]);

    //, numberOfDogs: 0, hasExperience: false, hasDog: false  <------- uzeti iz baze?
    function onChange(event) {
        const {name, value} = event.target;
        setForm(oldForm => ({...oldForm, [name]: value}))
    }

    function isValid() {
        const {userId, startDate, endDate, flexible, address, lat, lng, dogNumber} = form;
        return startDate && endDate && address.length>0;
    }

		
    function onSubmit(e){
        e.preventDefault();
        Geocode.fromAddress(form.address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                var location = lat + "|"+ lng
                let idOfUser = localStorage.getItem('id');
                console.log(form.flexible + " ovo je ")
                axios.post('/api/reqdog/new/' + idOfUser, {
                    "dogAge": form.dogAge,
                    "dogTimeBegin": form.startDate,
                    "dogTimeEnd": form.endDate,
                    "flexible": form.flexible,
                    "location": location,
                    "numberOfDogs": form.numberOfDogs,
                    "breedId": form.breed,
                    "id": idOfUser
                }).then(async response => {
                    console.log(response)
                    setIsDisabled(false);
                    window.location.href = "/users/offers";
                }).catch(err => {
                    console.log(err);
                    alert(err.response.data.message)
                    setIsDisabled(false);
                })
            },
            (error) => {
                console.error(error);
                window.alert("Netočna adresa! \nMolimo provjerite vaš unos.")
            }
        );
    }

    React.useEffect(() => {
        axios.get('/api/dogs/breeds').then(response => {
            console.log(response.data);
            setBreeds(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

    React.useEffect(() => {
        let id = localStorage.getItem('id');
        axios.get('/api/users/profile/' + id).then(response => {
            console.log(response.data);
            setUser(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

    


    return (
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Novi oglas</title>
            </Helmet>

            <Navbar/>

            <div className="form-section-container ">
                <div className="form-container background-citrus">

                    <Box
                        sx={{
                            padding: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5" className="text-blackolive">
                            Predaj oglas!
                        </Typography>
                        <Box component="form"  sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <StyledTextField
                                        required
                                        fullWidth
                                        id="startDate"
                                        label="Datum početka"
                                        name="startDate"
                                        type="date"
                                        onChange={onChange}
                                        value={form.startDate}
                                        focused
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <StyledTextField
                                        required
                                        fullWidth
                                        id="endDate"
                                        label="Datum završetka"
                                        name="endDate"
                                        type="date"
                                        onChange={onChange}
                                        value={form.endDate}
                                        focused
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <NativeSelect
                                        inputProps={{
                                            name: 'flexible',
                                            id: 'flexible',
                                        }}
                                        fullWidth
                                        required
                                        defaultValue={0}
                                        onChange={onChange}
                                        value={form.flexible}
                                    >
                                        <option value={false}>Nije fleksibilno</option>
                                        <option value={true}>Fleksibilno</option>
                                    </NativeSelect>
                                </Grid>


                                <Grid item xs={12}> 
                                    <StyledTextField
                                        name="address"
                                        required
                                        fullWidth
                                        id="address"
                                        label="Adresa"
                                        onChange={onChange}
                                        value={form.address}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <StyledTextField
                                        name="dogAge"
                                        fullWidth
                                        id="dogAge"
                                        label="Željena dob psa"
                                        onChange={onChange}
                                        value={form.dogAge}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <StyledTextField
                                        name="numberOfDogs"
                                        fullWidth
                                        id="numberOfDogs"
                                        label="Željeni broj pasa"
                                        onChange={onChange}
                                        value={form.numberOfDogs}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputLabel id="breed-label">Preferirana pasmina</InputLabel>
                                    <NativeSelect
                                        // disablePortal
                                        inputProps={{
                                            name: 'breed',
                                            id: 'breed'
                                        }}
                                        fullWidth
                                        onChange={onChange}
                                        value={form.breed}
                                    >
                                        {breeds.map(breed =>
                                            <option value={breed.breedId}>{breed.name}</option>)}
                                    </NativeSelect>

                                </Grid>


                                <Grid item xs={12}>
                                    <div className="form-button-container">
                                        <button
                                            type="submit"
                                            className="button button-primary"
                                            variant="contained"
                                            disabled={!isValid() || isDisabled}
                                            onClick={onSubmit}
                                        >
                                            Predaj
                                        </button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    );

}

export default NewOffer;