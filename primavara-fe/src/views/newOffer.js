import React, {useState} from 'react'
import PasswordChecklist from "react-password-checklist"
import { Helmet } from 'react-helmet'

import Navbar from './partials/navbar'
import Footer from './partials/footer'
import './home.css'
import '../index.css'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NativeSelect from '@mui/material/NativeSelect';
import { alpha, styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import axios, {AxiosError} from "axios";

import Geocode from "react-geocode";



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

function newOffer(){
    const [isDisabled, setIsDisabled] = useState(false)
    const [form, setForm] = React.useState({userId: localStorage.id, startDate: '',endDate: '', flexible: '', address: '', lat: '', lng: ''})
    const [breeds, setBreeds] = React.useState([])
    const [dogs, setDogs] = React.useState([])

    function onChange(event) {
        const {name, value} = event.target;
        setForm(oldForm => ({...oldForm, [name]: value}))
    }

    function isValid() {
        const {userId, startDate, endDate, flexible, address, lat, lng} = form;
        return startDate && endDate && address.length>0;
    }

    function onSubmit(e){
        e.preventDefault();
        Geocode.fromAddress(form.address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                form.lat = lat
                form.lng = lng
                var location = [form.lat, form.lng]
                var bodyFormData = new FormData();
                var breedId;
                breeds.forEach(breed => {
                    if (breed.name == form.breed) {
                        breedId = breed.id;
                    }
                })

                let idOfUser = localStorage.getItem('id');
                bodyFormData.append("location", location);
                bodyFormData.append("numberOfDogs", numberOfDogs);
                bodyFormData.append("guardTimeBegin", form.startDate);
                bodyFormData.append("guardTimeEnd", form.endDate);
                bodyFormData.append("hasExperience", haxExperience);
                bodyFormData.append("hasDog", hasDog);
                bodyFormData.append("dogId", dogId); //ovo ce bit lista svih Id-eva
                bodyFormData.append("id", idOfUser);
                axios({
                    method: "post",
                    url: "/api/reqgua/new/" + idOfUser,
                    data: bodyFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                }).then(response => {
                    console.log(response)
                }).catch(err => {
                    console.log(err);
                    alert(err.response.data.message)
                });
            },
            (error) => {
                console.error(error);
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
        axios.get('/api/dogs/my/' + id).then(response => {
            console.log(response.data);
            setDogs(response.data);
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
                                        <option value={0}>Nije fleksibilno</option>
                                        <option value={1}>Fleksibilno</option>
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

export default newOffer;