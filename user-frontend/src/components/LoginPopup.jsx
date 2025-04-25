import React, { useContext, useState } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {
    const [currState, setCurrState] = useState("Log In");
    const {url, setToken, setUserId} = useContext(UserContext);
    const [data, setData] = useState({
        username:"",
        email:"",
        password:""
      })

    const onChangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData(data => ({...data, [name]:value}));
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      let newUrl = url;
      if(currState === "Log In") {
        newUrl += "/api/user/login"
      }else{
        newUrl += "/api/user/register"
      }

      try {
        const response = await axios.post(newUrl, data);
        if(response.data.success){
          setUserId(response.data.userId);
          setToken(response.data.token);
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('token',response.data.token);
          setShowLogin(false);
      }else{
        console.log(response.data.message);
      }
      } catch (error) {
        alert(error);
      }
    }

    
  return (
    // login modal
    <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
        <div className='relative bg-white p-5 rounded-lg w-[30%]  overflow-y-auto text-center'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>{currState}</h1>
                <i 
                  class="fi fi-rr-cross cursor-pointer" 
                  onClick={()=>setShowLogin(false)}/>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-5'>
              {
                currState==="Sign Up"?<input 
                type="text" 
                placeholder='name' 
                name='username'
                onChange={onChangeHandler}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>:<></>
              }
              <input 
                type="email" 
                placeholder='email' 
                name='email'
                onChange={onChangeHandler}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <input 
                type="password" 
                placeholder='password' 
                name='password'
                onChange={onChangeHandler}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <button 
                type='submit' 
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">{currState}</button>

              {
                currState==="Sign Up"?
                <p>Already a User? <span className='text-sky-600 cursor-pointer font-medium hover:text-sky-700' onClick={()=>setCurrState("Log In")}>Log In</span></p>:
                <p>New User? <span className='text-sky-600 cursor-pointer font-medium hover:text-sky-700' onClick={()=>setCurrState("Sign Up")}>Sign Up</span></p>
              }
            </form>
        </div>
    </div>
  )
}

export default LoginPopup;