import React, {useState} from 'react'
import PasswordChecklist from "react-password-checklist"
import { Helmet } from 'react-helmet'

import Navbar from './partials/navbar'

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

    const [blob, setBlob] = React.useState()

    function onImageChange(e) {
        const {name, value} = e.target;
        setForm(oldForm => ({...oldForm, [name]: value}))
        setImages([...e.target.files])
        console.log(images[0])
        const reader = new FileReader();
        reader.onload = function(e) {
            console.log(e.target.result);
            // setBlob(new Blob([new Uint8Array(e.target.result)], {type: images[0].type }));
            const blob1 = new Blob([new Uint8Array(e.target.result)], {type: images[0].type })
            setBlob(blob1);
            console.log(blob1)

        };
        console.log(reader.readAsArrayBuffer(images[0]));
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
        // setIsDisabled(true);
        /*var breedId;
        console.log(images[0])
        breeds.forEach(breed => {
            if (breed.name == form.breed) {
                breedId = breed.breedId;
            }
        })*/
        let idOfUser = localStorage.getItem('id');
        // var blob = new Blob([images[0]], {type: "file"})
        //or const file = document.querySelector('input[type=file]').files[0];
        axios.put('/api/dogs/register/' + idOfUser, {
            "name": form.name,
            "dateOfBirth": form.dateOfBirth,
            "photo": blob,
            "breedId": form.breed,
            "id": idOfUser,
        }).then(async response => {
            window.location.href = "/users/dogs"
            setIsDisabled(false);
        }).catch(err => {
            alert(err.response.data.message)
            console.log(blob)
            setIsDisabled(false);
        })

        // var formData = new FormData();
        // let dog = {
        //     "name": form.name,
        //     "dateOfBirth": form.dateOfBirth,
        //     "photo": blob[0],
        //     "breedId": form.breed,
        // }
        // // formData.append("name", form.name)
        // // formData.append("dateOfBirth", form.dateOfBirth)
        // // formData.append("photo", blob[0])
        // // formData.append("breedId", form.breed)
        // formData.append("registerDog", dog)
        // formData.append("id", idOfUser)
        // console.log(formData);

        // axios({
        //     method: "put",
        //     url: "/api/dogs/register/" + idOfUser,
        //     data: formData,
        //     headers: { "Content-Type": "multipart/form-data" },
        // }).then(response => {
        //     console.log(response);
        //     window.alert("Great success!")
        // }).catch(error => {
        //     console.log(error);
        // })



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