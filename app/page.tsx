import React from 'react'
import Navbar from './Composants/Navbar'
import Footer from './Navbar/footer/footer'
import BazarShopHero from './Composants/Accueil'

function page() {
  return (
    <div>
      <Navbar/>
      <BazarShopHero/>
      <Footer/>
    </div>
  )
}

export default page