import React from 'react'
import Navbar from '../Pages/Share/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Pages/Share/Footer/Footer'

const Main = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Main
