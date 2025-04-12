import React, { useEffect, useState } from 'react'
import { useParams, Outlet, NavLink } from 'react-router-dom'
import Footer from '../components/Footer';

const Home = () => {
    const {id} = useParams();

    return (
    <div className='bg-[#F8F8F8] flex'> 
      <div className='w-[20%] p-7.5'>
        <h1 className='text-3xl font-bold'>NGODekho</h1>
        <div className='mt-10 mb-50 flex flex-col gap-5'>
          <NavLink to={`/home/${id}`} className='text-xl font-medium'>Dashboard</NavLink>
          <NavLink to={`/home/${id}/profile`} className='text-xl font-medium'>Profile</NavLink>
          <NavLink to={`/`} className='text-xl font-medium'>Log Out</NavLink>
        </div>
        <Footer/>
      </div>
      <div className='w-[80%]'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Home