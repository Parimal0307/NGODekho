import React, { useContext } from 'react'
import {NavLink, Outlet, useNavigate} from 'react-router-dom'
import user from "../assets/user.png"
import Footer from "../components/Footer"
import { UserContext } from '../components/UserContext'

const Profile = () => {
    const navigate = useNavigate();
    const {url, userDetails} = useContext(UserContext);

  return (
    <div className='bg-[#F8F8F8] flex  h-screen'>
        <div className='w-[20%] h-full justify-between p-7.5 flex flex-col'>
            <div className='flex flex-col gap-8'>
                <h1 className='text-3xl font-bold cursor-pointer' onClick={()=>navigate('/')}>NGODekho</h1>
                <img src={`${url}/images/${userDetails.dp}` || user} className="w-30 h-30 rounded-full object-cover border-1 border-black" alt="user_img" />
                <div className='flex flex-col gap-4'>
                    <NavLink to={'/profile'} className='text-xl font-medium'>My Profile</NavLink>
                    <NavLink to={'/profile/myapplications'} className='text-xl font-medium'>My Applications</NavLink>
                    <NavLink to={'/profile/savedngos'} className='text-xl font-medium'>Saved NGOs</NavLink>
                    <NavLink  className='text-xl font-medium'>Log Out</NavLink>
                </div>
            </div>
            <Footer/>
        </div>
        <div className='p-7.5 overflow-y-auto w-[80%] no-scrollbar'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Profile