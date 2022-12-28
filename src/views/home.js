import React from 'react'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import './home.css'

function Home() {
    let isLoggedIn = true;


    if (localStorage.getItem("username") == null) {
        isLoggedIn = false;
    }

    if (!isLoggedIn) {
        var registerButton = <a href="/users/register" className='button-href'><button className="button button-gradient">Pridruži se</button></a>
        var loginButton = <a href="/users/login" className='button-href'><button className="button button-transparent">Prijava</button></a>
    }
  return (

    <div className="page-container mandatory-scroll-snapping">
      <Helmet>
        <title>CuvariPasa | Naslovnica</title>
      </Helmet>

      <Navbar/>

      <div className="section-container background-blackolive">
          <div className="home-text-content">
            <span className="home-subtitle">
              samo najbolje za Vašeg ljubimca
            </span>
            <h1 className="home-title">
              <span>Cjelodnevno čuvanje ili kratka šetnja,</span><br/>
              <span className="text-apricot">Vi birate</span>
            </h1>
            <span className="home-description">
              Široka ponuda čuvatelja osigurava savršen odabir za svakoga, <br/>
              Vaš mezimac može biti u odgovorim rukama već za par sati, <br/> <br/>
              Što čekate, pridružite nam se odmah!
            </span>
            <div className="home-button-container">
                {registerButton}
                {loginButton}
            </div>
          </div>
          <div className="home-main-image-container">
            <img src="/images/home01.jpg" className="home-main-image"/>
          </div>
      </div>


      <div className="section-container">
          <div className="home-second-image-container">
            <img src="/images/home02.jpg" className="home-second-image"/>
          </div>

          <div className="home-text-content">
            <span className="home-subtitle">Zabava ili zarada?</span>
            <h1 className="home-secondary-title">Tko kaže da ne može oboje!</h1>
            <span className="home-secondary-text">
              Ako si ljubitelj životinja i voliš trošiti sate na igru s njima, <br/>
              iskoristi svoju strast za laganu zaradu!
            </span>
            <div className="home-button-container">
              <button className="button-gradient button">
                Dodaj svoj oglas
              </button>
            </div>
        </div>
      </div>

      
      <div className="section-container background-citrus">
        <div className="home-text-content">
          <div className='home-background-border-blackolive'>
            <span className="home-subtitle">Imate pitanja?</span><br/>
            <h1 className="home-secondary-title">Obratite nam se!</h1>
            <span className="home-secondary-text">
              Svaki upit smatramo važnim, bilo to pitanje ili pohvala, <br/>
              naš tim Vam je uvijek na raspolaganju. <br/>
              <br/>
              Ustrajno radimo na rješavanju svih upita :)
            </span>
            <div className="home-button-container">
              <button className="button-gradient button">
                Kontaktirajte nas
              </button>
            </div>
          </div>
        </div>

        <div className="home-third-image-container">
          <img src="/images/home03.jpg" className="home-third-image"/>
        </div>
      </div>

      <Footer/>
    </div>




  )
}

export default Home;
