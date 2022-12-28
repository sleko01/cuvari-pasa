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

function RegisterDog(){
    const [isDisabled, setIsDisabled] = useState(false)
    const [form, setForm] = React.useState({userId: localStorage.id, name: '', dateOfBirth: '', breed: '', image: ''})
    const [breeds, setBreeds] = React.useState([])


    function onChange(event) {
        const {name, value} = event.target;
        setForm(oldForm => ({...oldForm, [name]: value}))
    }

    function isValid() {
        const {userId, name, dateOfBirth, breed, image} = form;
        return name.length > 0 && dateOfBirth && image;
    }

    function onSubmit(e){

    }

    //React.useEffect() //fetch za breedove

    return (
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Registracija</title>
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
                            Registriraj psa!
                        </Typography>
                        <Box component="form"  sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <StyledTextField
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Ime psa"
                                        onChange={onChange}
                                        value={form.name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <StyledTextField
                                        required
                                        fullWidth
                                        id="dateOfBirth"
                                        label="Datum rođenja"
                                        name="dateOfBirth"
                                        type="date"
                                        onChange={onChange}
                                        value={form.dateOfBirth}
                                        focused
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        id="breed"
                                        options={breeds}
                                        renderInput={(params) => <StyledTextField {...params} label="Vrsta"/>}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <StyledTextField
                                        required
                                        fullWidth
                                        id="image"
                                        label="Slika psa"
                                        name="image"
                                        type="file"
                                        onChange={onChange}
                                        value={form.image}
                                        focused
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
                                            Registracija psa
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

export default RegisterDog;