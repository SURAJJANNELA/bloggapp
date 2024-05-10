import React from 'react'
import Footer from '../Footer/Foot'
import { Outlet } from 'react-router-dom'
import Navbar from '../NavigationBar/Navgbar'
import './Rootlayout.css'

function Rootlayout() {
  return (
    <div >
      <Navbar/>
      <div className='col'>
      <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default Rootlayout
