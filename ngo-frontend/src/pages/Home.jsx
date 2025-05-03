import React, { useContext, useState } from 'react'
import { useParams, Outlet, NavLink, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import { NewContext } from '../components/NewContext';
import Logout from '../components/Logout';
import { toast } from 'react-toastify';

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setToken, setNgoId } = useContext(NewContext);
  const [showLogout, setShowLogout] = useState(false);

  const logOut = () => {
    localStorage.removeItem("ngoToken");
    localStorage.removeItem("ngoId");

    setToken("");      // Clear context/token
    setNgoId("");      // Clear context/id

    navigate("/");     // Redirect to login
    toast.success("Logged Out");
  }

  return (
    <div className='bg-[#F8F8F8] flex h-screen'>
      {showLogout ? <Logout logOut={logOut} setShowLogout={setShowLogout} /> : <></>}
      <div className='w-[20%] h-full justify-between p-7.5 flex flex-col'>
        <div className='flex flex-col gap-8'>
          <h1 className='text-3xl font-bold'>NobleConnect</h1>
          <div className='flex flex-col gap-5'>
            <NavLink to={`/home/${id}`} className='text-xl font-medium'>Dashboard</NavLink>
            <NavLink to={`/home/${id}/profile`} className='text-xl font-medium'>Profile</NavLink>
            <div onClick={() => setShowLogout(true)} className='text-xl font-medium cursor-pointer'>Log Out</div>
          </div>
        </div>
        <Footer />
      </div>
      <div className='overflow-y-auto w-[80%] no-scrollbar'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home