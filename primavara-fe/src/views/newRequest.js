import React, {useState} from 'react'
import { Helmet } from 'react-helmet'

import Navbar from './partials/navbar'
import '../styles/home.css'
import '../styles/index.css'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { InputLabel } from '@mui/material'

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NativeSelect from '@mui/material/NativeSelect';
import { alpha, styled } from '@mui/material/styles';
import axios, {AxiosError} from "axios";



import Geocode from "react-geocode";
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

function NewRequest(){
    const [isDisabled, setIsDisabled] = useState(false)
    const [form, setForm] = React.useState({userId: localStorage.id, startDate: '',endDate: '', flexible: '', address: '', lat: '', lng: '', hasExperience: 0, hasDog: 0})
    const [dogs, setDogs] = React.useState([])
    const [activities, setActivities] = React.useState([])
    const [selectedActivities, setSelectedActivities] = React.useState([])
    const [selectedDogs, setSelectedDogs] = React.useState([])

    const changeDogs = (event) => {
        const {
            target: {value},
        } = event;
        setSelectedDogs(typeof value === 'string' ? value.split(',') : value,)
    }

    const changeActivities = (event) => {
        const {
            target: {value},
        } = event;
        setSelectedActivities(typeof value === 'string' ? value.split(',') : value,)
    }


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
                var location = lat + "|"+ lng
                let idOfUser = localStorage.getItem('id');
                console.log(activities)
                axios.post('/api/reqgua/new/' + idOfUser, {
                    "guardTimeBegin": form.startDate,
                    "guardTimeEnd": form.endDate,
                    "location": location,
                    "hasDog": form.hasDog,
                    "hasExperience": form.hasExperience,
                    "id": idOfUser,
                    "dogId": selectedDogs,
                    "numberOfDogs": selectedDogs.length,
                    "activityId": selectedActivities
                }).then(async response => {
                    console.log(response)
                    setIsDisabled(false);
                    window.location.href = "/users/requests";
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
        axios.get('/api/activity').then(response => {
            console.log(response.data);
            setActivities(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

    React.useEffect(() => {
        let id = localStorage.getItem('id');
        axios.get('/api/dogs/my/' + id).then(response => {
            // console.log(response.data);
            setDogs(response.data);
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
                            Predaj zahtjev!
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
                                            name: 'hasExperience',
                                            id: 'hasExperience'
                                        }}
                                        fullWidth
                                        required
                                        defaultValue={0}
                                        onChange={onChange}
                                        value={form.hasExperience}
                                    >
                                        <option value={false}>Nije potrebno iskustvo</option>
                                        <option value={true}>Potrebno iskustvo</option>
                                    </NativeSelect>
                                </Grid>

                                <Grid item xs={12}>
                                    <NativeSelect
                                        inputProps={{
                                            name: 'hasDog',
                                            id: 'hasDog',
                                        }}
                                        fullWidth
                                        required
                                        defaultValue={0}
                                        onChange={onChange}
                                        value={form.hasDog}
                                    >
                                        <option value={false}>Ne mora imati psa</option>
                                        <option value={true}>Mora imati psa</option>
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
                                <InputLabel id="dogs-label">Psi</InputLabel>
                                    <Select
                                        fullWidth
                                        name="dogs"
                                        id="dogs"
                                        multiple
                                        onChange={changeDogs}
                                        value={selectedDogs}
                                        renderValue={(selected) => {
                                            if(selected.length == 0) {
                                                return <em>Psi</em>
                                            }
                                            return selected.join(",")
                                        }}
                                    >
                                        {dogs && dogs.map(dog => (
                                            <MenuItem value={dog.dogId}>{dog.name}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>

                                <Grid item xs={12}>
                                <InputLabel id="activities-label">Aktivnosti</InputLabel>
                                    <Select
                                        fullWidth
                                        name="activities"
                                        id="activities"
                                        multiple
                                        onChange={changeActivities}
                                        value={selectedActivities}
                                        renderValue={(selected) => {
                                            if(selected.length == 0) {
                                                return <em>Aktivnosti</em>
                                            }
                                            return selected.join(",")
                                        }}
                                    >
                                        {activities && activities.map(activity => (
                                            <MenuItem value={activity.activityId}>{activity.activityName}</MenuItem>
                                        ))}
                                    </Select>
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

export default NewRequest;