import React, {useState} from 'react'
import { Helmet } from 'react-helmet'

import Navbar from './partials/navbar'
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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

function NewRequest(){
    const [isDisabled, setIsDisabled] = useState(false)
    const [form, setForm] = React.useState({userId: localStorage.id, startDate: '',endDate: '', flexible: '', address: '', lat: '', lng: '', dogs: []})
    //const [dogs, setDogs] = React.useState([])
    var dogs = [{name: "floki", dogId: 0},{name:"ante", dogId: 1},{name:"eugen", dogId: 2}]
    //React.useEffect() --- fetchat pse od vlasnika

    function onChange(event) {
        const {name, value} = event.target;
        setForm(oldForm => ({...oldForm, [name]: value}))
    }

    function isValid() {
        const {userId, startDate, endDate, flexible, address, lat, lng, dogs} = form;
        return startDate && endDate && address.length>0 && dogs;
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
                bodyFormData.append("dogAge", dogAge);
                bodyFormData.append("dogTimeBegin", form.startDate);
                bodyFormData.append("dogTimeEnd", form.endDate);
                bodyFormData.append("isFlexible", form.flexible);
                bodyFormData.append("location", location);
                bodyFormData.append("numberOfDogs", numberOfDogs);
                bodyFormData.append("breedId", breedId)
                axios({
                    method: "post",
                    url: "/api/reqdog/new/" + idOfUser,
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
            // setBreeds(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);


    return (
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Novi zahtjev</title>
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
                                    <NativeSelect
                                        inputProps={{
                                            name: 'dogs',
                                            id: 'dogs',
                                        }}
                                        fullWidth
                                        required
                                        onChange={onChange}
                                        value={form.dogs}
                                    >
                                        {dogs && dogs.map(dog => (
                                            <option value={dog.dogId}>{dog.name}</option>
                                        ))}
                                    </NativeSelect>
                                </Grid>


                                <Grid item xs={12}>
                                    <div className="form-button-container">
                                        <button
                                            type="submit"
                                            className="button button-primary"
                                            variant="contained"
                                            disabled={!isValid() || isDisabled}
                                            // onClick={onSubmit}
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

export default NewRequest;