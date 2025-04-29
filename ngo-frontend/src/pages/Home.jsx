import React, { useContext, useState } from 'react'
import { useParams, Outlet, NavLink, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import { NewContext } from '../components/NewContext';
import Logout from '../components/Logout';

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {setToken, setNgoId} = useContext(NewContext);
  const [showLogout, setShowLogout] = useState(false);

  const logOut = () => {
    localStorage.removeItem("ngoToken");
    localStorage.removeItem("ngoId");

    setToken("");      // Clear context/token
    setNgoId("");      // Clear context/id

    navigate("/");     // Redirect to login
  }

  return (
    <div className='bg-[#F8F8F8] flex'>
      {showLogout?<Logout logOut={logOut} setShowLogout={setShowLogout}/>:<></>}
      <div className='w-[20%] p-7.5'>
        <h1 className='text-3xl font-bold'>NGODekho</h1>
        <div className='mt-10 mb-50 flex flex-col gap-5'>
          <NavLink to={`/home/${id}`} className='text-xl font-medium'>Dashboard</NavLink>
          <NavLink to={`/home/${id}/profile`} className='text-xl font-medium'>Profile</NavLink>
          <div onClick={()=>setShowLogout(true)} className='text-xl font-medium cursor-pointer'>Log Out</div>
        </div>
        <Footer />
      </div>
      <div className='w-[80%]'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home