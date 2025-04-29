import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { NewContext } from './NewContext';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const {url, setToken, setNgoId} = useContext(NewContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        category: "",
        location: "",
        mission: "",
      });

    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        setFormData(formData => ({ ...formData, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/ngo/register`, formData);
            if(response.data.success){
                setToken(response.data.token);
                setNgoId(response.data.id);
                localStorage.setItem('ngoToken',response.data.token);
                localStorage.setItem('ngoId',response.data.id);
                console.log("User registered, check db");
                navigate(`/home/${response.data.id}`);
            }else{
                console.log(response.data.message);
            }
        } catch (error) {
            alert(error);
        }
    }

  return (
    <div className='h-[100%]] flex flex-col gap-10 bg-[#F8F8F8]'>
        <div className='pt-4 flex flex-col items-center justify-center gap-10'>
            <div>
                <h1 className='text-6xl font-bold'>NGODekho</h1>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-white rounded-xl p-6 shadow-lg w-80 md:w-96'>
                <div className='flex flex-col gap-3'>
                    <input 
                        type="text" 
                        placeholder='NGO Name'
                        name='name'
                        required
                        onChange={handleChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input 
                        type="email" 
                        placeholder='Email'
                        name='email'
                        required
                        onChange={handleChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input 
                        type="password" 
                        placeholder='Password'
                        name='password'
                        required
                        onChange={handleChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input 
                        type="text" 
                        placeholder='Category'
                        name='category'
                        required
                        onChange={handleChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input 
                        type="text" 
                        placeholder='Location'
                        name='location'
                        required
                        onChange={handleChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <textarea 
                        placeholder='Mission'
                        name='mission'
                        required
                        onChange={handleChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <button
                  type='submit'
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition cursor-pointer"
                >Add NGO</button>
                <p 
                    className='text-center text-sm text-blue-500 cursor-pointer hover:underline' 
                    onClick={()=>navigate('/')}
                >Already have an account?</p>
            </form>
        </div>

        
        <div className="pb-4 w-full text-center text-gray-600 text-sm">
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
            <p className="mt-2">NGODekho © 2025 All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Register