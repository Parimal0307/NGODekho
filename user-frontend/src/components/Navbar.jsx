import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext';
import user from '../assets/user.png';

const Navbar = ({setShowLogin}) => {

  const {token, url, userDetails} = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className='bg-black w-full flex justify-between items-center px-12 py-4'>
        <h1 className='text-4xl text-white font-bold cursor-pointer' onClick={()=>navigate('/')}>NGODekho</h1>
        <div className='flex items-center justify-between border w-[35%] border-white rounded-full px-7 py-1'>
            <input 
                className='placeholder-white w-[90%] focus:outline-none text-white' 
                type="text" 
                placeholder='Find NGOs'/>
            <i class="fi fi-rr-search text-white cursor-pointer"></i>
        </div>
        {
          token?<img src={`${url}/images/${userDetails.dp}` || user} onClick={()=>navigate('/profile')} alt="user_icon" className='w-13 h-13 rounded-full object-cover border-2 border-white cursor-pointer'/>
          :<p className='text-white text-2xl cursor-pointer' onClick={()=>setShowLogin(true)}>Log In</p>
        }
    </div>
  )
}

export default Navbar