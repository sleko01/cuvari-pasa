import React from 'react'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'
import './home.css'
import '../index.css'

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

function Login(){

    const [form, setForm] = React.useState({email: '', password: ''});

    function onChange(event) {
        const {name, value} = event.target;
        setForm(oldForm => ({...oldForm, [name]: value}))
    }

    function isValid() {
        const {email, password} = form;
        return password.length >= 8 && /\S+@\S+\.\S+/.test(email);
    }

    function onSubmit(e) {
        e.preventDefault()
        alert("Tu trebas implementirat vezu frontenda i bekenda")
    }

    return(

        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Registracija</title>
            </Helmet>

            <Navbar/>


            <div className="form-section-container">
                <div className='form-container background-citrus'>
                    <Box
                        sx={{
                            padding: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5" className="text-blackolive">
                            Prijavi se!
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <StyledTextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Adresa"
                                        name="email"
                                        onChange={onChange}
                                        value={form.email}
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
                                        onChange={onChange}
                                        value={form.password}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <div className="form-button-container">
                                    <button
                                        type="submit"
                                        fullWidth
                                        className="button button-primary"
                                        variant="contained"
                                        onClick={onSubmit}
                                        disabled={!isValid()}
                                    >
                                        Prijava
                                    </button>
                                    </div>
                                </Grid>

                            </Grid>


                        </Box>
                    </Box>
                </div>
                
            </div>



            <div className="form-footer">
            <Footer/>
            </div>
        </div>
    );
}

export default Login;