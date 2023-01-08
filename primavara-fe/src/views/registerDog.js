import React, {useState} from 'react'
import PasswordChecklist from "react-password-checklist"
import { Helmet } from 'react-helmet'
import CryptoJS from 'crypto-js'

import Navbar from './partials/navbar'

import '../styles/responsive.css'
import '../styles/home.css'
import '../styles/index.css'
import '../styles/moderation.css'
import '../styles/profile.css'
import '../styles/requestsAndOffers.css'

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
    const [form, setForm] = React.useState({userId: localStorage.id, name: '', dateOfBirth: '', breed: '1', image: []})
    const [breeds, setBreeds] = React.useState([])
    const [images, setImages] = React.useState([])
    const [image, setImage] = React.useState([])

    function onImageChange(e) {
        const {name, value} = e.target;
        setForm(oldForm => ({...oldForm, [name]: value}))
        setImages([...e.target.files])
        getBase64(...e.target.files)
    }

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          localStorage.setItem('photo', reader.result);
          setImage(reader.result);
          console.log(typeof(reader.result))
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }

    function decrypt(password) {
        return CryptoJS.enc.Base64.parse(password).toString(CryptoJS.enc.Utf8);
    }
    

    function onChange(event) {
        const {name, value} = event.target;
        setForm(oldForm => ({...oldForm, [name]: value}))
    }

    function isValid() {
        const {userId, name, dateOfBirth, breed, image} = form;
        return name.length > 0 && dateOfBirth && image;
    }

    function onSubmit(e) {
        e.preventDefault()
        let idOfUser = localStorage.getItem('id');
        var basicAuth = localStorage.getItem("id") == undefined ? '' : 'Basic ' + window.btoa(localStorage.getItem("username") + ":" + decrypt(localStorage.getItem("encryptedPassword")));

        var formData = new FormData();
        console.log(form.name + "name")
        
        formData.append("name", form.name)
        formData.append("dateOfBirth", form.dateOfBirth)
        formData.append("photo", image)
        localStorage.removeItem('photo')
        formData.append("breedId", form.breed)
    
        console.log(formData.get('photo'));

        axios({
            method: "put",
            url: "/api/dogs/register/" + idOfUser,
            data: formData,
            headers: {
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data`,
                'Authorization': basicAuth
              },
        }).then(response => {
            console.log(response);
            window.location.href = "/users/dogs"
        }).catch(error => {
            console.log(error);
            if(error.response.status = 403) window.alert("Nemate odgovarajuće ovlasti!")
            if(localStorage.getItem("id") == undefined) window.location.href = "/users/login";
        })



    }

    React.useEffect(() => {
        axios.get('/api/dogs/breeds').then(response => {
            setBreeds(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

    return (
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Registracija</title>
            </Helmet>

            <Navbar/>

            <div className="form-section-container ">
                <div className="form-container form-container-dog background-citrus">

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
                                        format = "dd/MM/yyyy"
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
                                    <NativeSelect
                                        // disablePortal
                                        inputProps={{
                                            name: 'breed',
                                            id: 'breed'
                                        }}
                                        fullWidth
                                        required
                                        onChange={onChange}
                                        value={form.breed}
                                    >
                                        {breeds.map(breed =>
                                            <option value={breed.breedId} key={breed.breedId}>{breed.name}</option>)}
                                    </NativeSelect>

                                </Grid>

                                <Grid item xs={12}>
                                    <StyledTextField
                                        required
                                        fullWidth
                                        id="image"
                                        label="Slika psa"
                                        name="image"
                                        type="file"
                                        onChange={onImageChange}
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