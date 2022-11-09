import React from 'react'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'
import './home.css'
import './register.css'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NativeSelect from '@mui/material/NativeSelect';
import { alpha, styled } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

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

function Register(){
    return(
        <div className="page-container">
            <Helmet>
                <title>DOGWATCH | Registracija</title>
            </Helmet>

            <Navbar/>


            <div className="main-container section-container background-citrus">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" className="text-blackolive">
                        Pridruži se!
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <StyledTextField
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Ime"
                                    sx
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledTextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Prezime"
                                    name="lastName"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <StyledTextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Adresa"
                                    name="email"

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <StyledTextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Lozinka"
                                    type="password"
                                    id="password"
                                />
                            </Grid>
                            <Grid item xs={12}>

                                <NativeSelect
                                    inputProps={{
                                        name: 'role',
                                        id: 'role',
                                    }}
                                    fullWidth
                                    required
                                    defaultValue={"none"}
                                >
                                    <option value={"none"} disabled>Odabir uloge</option>
                                    <option value={1}>Vlasnik</option>
                                    <option value={2}>Čuvar</option>
                                    <option value={3}>Vlasnik i čuvar</option>
                                </NativeSelect>
                            </Grid>
                            <Grid item xs={12}>
                                    <button
                                        type="submit"
                                        fullWidth
                                        className="button button-primary bigButton"
                                        variant="contained"
                                    >
                                        Registracija
                                    </button>
                            </Grid>

                        </Grid>


                    </Box>
                </Box>
            </div>




            <Footer/>
        </div>
    );
}

export default Register;