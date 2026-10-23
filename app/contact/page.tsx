import React from 'react'
import Contact from '../Composants/Contact'
import Footer from '../Navbar/footer/footer'
import Navbar from '../Composants/Navbar'

function page() {
  return (
    <div>
        <Navbar/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default page