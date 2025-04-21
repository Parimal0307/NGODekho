import React, { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from './UserContext'

const EditDetails = ({setShowEditDetails, userDetails}) => {
  const {url, userId} = useContext(UserContext);
  const [details, setDetails] = useState({
    fullName: userDetails.fullName || "",
    phone: userDetails.phone || "",
    location: userDetails.location || ""
  })

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`${url}/api/user/updateDetails/${userId}`, details);
      if (response.data.success) {
        alert("Updated successfully!");
      }
    } catch (error) {
      console.log("Error updating data");
    }
  }


  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
        <div className='relative bg-white p-5 rounded-lg w-[30%]  overflow-y-auto text-center'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>Edit Details</h1>
                <i 
                  class="fi fi-rr-cross cursor-pointer" 
                  onClick={()=>setShowEditDetails(false)}/>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-5'>
                <input 
                    type="text" 
                    placeholder='Full Name'
                    name='fullName'
                    value={details.fullName}
                    onChange={handleBasicChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <input 
                type="text" 
                placeholder='Phone Number' 
                name='phone'
                value={details.phone}
                onChange={handleBasicChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <input 
                type="text" 
                placeholder='Location' 
                name='location'
                value={details.location}
                onChange={handleBasicChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <button 
                type='submit' 
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">Update Details</button>
            </form>
        </div>
    </div>
  )
}

export default EditDetails