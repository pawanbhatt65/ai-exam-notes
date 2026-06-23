import React, { Fragment } from 'react'
import Navbar from '../components/Navbar'


const Home = () => {
  return (
    <Fragment>
      <div className='min-h-screen overflow-hidden bg-white text-black'>
        <Navbar />
      </div>
    </Fragment>
  )
}

export default Home