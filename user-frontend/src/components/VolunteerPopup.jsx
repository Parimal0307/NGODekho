import React, { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from './UserContext';

const VolunteerPopup = ({setShowApply, ngoId, programs}) => {
    const [selectedProgram, setSelectedProgram] = useState('');
    const [message, setMessage] = useState('');
    const {url, userId} = useContext(UserContext);

    
    const handleApply = async () => {
        try {
          const res = await axios.post(url+'/api/volunteer/apply', {
            userId: userId,
            ngoId: ngoId,
            appliedFor: selectedProgram,
          });
          setMessage(res.data.message);
        } catch (error) {
          setMessage(error.response?.data?.message || 'Something went wrong.');
        }
      };
    
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
        <div className='relative bg-white p-5 rounded-lg w-[30%]  overflow-y-auto text-center'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>Apply to Volunteer</h1>
                <i 
                  class="fi fi-rr-cross cursor-pointer" 
                  onClick={()=>setShowApply(false)}
                  />
            </div>
            
            <div className="mt-6">
            <select
                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
            >
                <option value="" disabled>Select a program</option>
                {programs.map((program) => (
                <option key={program._id} value={program.title}>
                    {program.title}
                </option>
                ))}
            </select>

            <button
                onClick={handleApply}
                disabled={!selectedProgram}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-200 ${selectedProgram ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
            >
                Apply
            </button>

            {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
            </div>
        </div>
    </div>
  )
}

export default VolunteerPopup