import React from 'react'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import './home.css'

function MyDogs(){
    const [dogs, setDogs] = React.useState([])

    React.useEffect() //implementacija fetch metode za popis psa

    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Naslovnica</title>
            </Helmet>

            <Navbar/>

            <table>
                <tbody>
                {dogs && dogs.map(dog =>
                    <tr key={dog.dogId}>
                        <td>{dog.name}</td>
                        <td>{dog.dateOfBirth}</td>
                        <td>{dog.photo}</td>
                        <td>{dog.ratingSum/dog.ratingCount}</td>
                    </tr>
                )}
                </tbody>
            </table>

            <Footer/>
        </div>

    )
}

export default MyDogs;