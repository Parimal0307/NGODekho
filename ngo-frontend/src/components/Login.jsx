import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { NewContext } from './NewContext';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const {url, setToken, setNgoId} = useContext(NewContext);
  const [data, setData] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data, [name]:value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/ngo/login`, data);
      if(response.data.success){
        setToken(response.data.token);
        setNgoId(response.data.id);
        localStorage.setItem('ngoToken',response.data.token);
        localStorage.setItem('ngoId',response.data.id);
        navigate(`/home/${response.data.id}`);
      }else{
        console.log(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
    }

  return (
    <div className='h-screen bg-[#F8F8F8]'>
        <div className='h-[85%] flex flex-col items-center justify-center gap-10 md:flex-row  md:justify-around'>
            <div>
                <h1 className='text-6xl font-bold'>NobleConnect</h1>
                <h3 className='text-2xl text-gray-700'>Connecting Changemakers,</h3>
                <h3 className='text-2xl text-gray-700'>Empowering Communities.</h3>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-white rounded-xl p-6 shadow-lg w-80 md:w-96'>
                <div className='flex flex-col gap-3'>
                    <input 
                        type="email" 
                        placeholder='Email'
                        name='email'
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input 
                        type="password" 
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                    >Log In</button>
                    <p className='text-center text-sm text-blue-500 cursor-pointer hover:underline'>Forgotten Password?</p>
                </div>
                <hr className=''/>
                <button
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition cursor-pointer"
                  onClick={()=>navigate('/register')}
                >Add NGO</button>
            </form>
        </div>
        <div className="absolute bottom-6 w-full text-center text-gray-600 text-sm">
        <div className="flex justify-center gap-4 mb-3">
          <i className="fi fi-brands-facebook text-xl cursor-pointer"></i>
          <i className="fi fi-brands-linkedin text-xl cursor-pointer"></i>
          <i className="fi fi-brands-instagram text-xl cursor-pointer"></i>
          <i className="fi fi-brands-twitter text-xl cursor-pointer"></i>
        </div>
        <div className="flex justify-center gap-6">
          <span className="cursor-pointer hover:underline">About</span>
          <span className="cursor-pointer hover:underline">Privacy Policy</span>
          <span className="cursor-pointer hover:underline">Terms & Conditions</span>
        </div>
        <p className="mt-2">NobleConnect © 2025 All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Login