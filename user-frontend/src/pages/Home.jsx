import React, {useContext, useState} from 'react'
import Navbar from '../components/Navbar'
import LoginPopup from '../components/LoginPopup';
import Filters from '../components/Filters';
import DisplayNGO from '../components/DisplayNGO';
import { UserContext } from '../components/UserContext';
import Carousel from '../components/Carousel';

const Home = () => {
    const {showLogin, setShowLogin} = useContext(UserContext);

  return (
    <div className='bg-[#F8F8F8] w-screen'>
        <Navbar setShowLogin={setShowLogin}/>
        <Carousel/>
        {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
        <div className='flex'>
            <Filters/>
            <DisplayNGO/>
        </div>
    </div>
  )
}

export default Home