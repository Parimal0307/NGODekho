import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../components/UserContext';
import axios from 'axios';
import defaultImg from "../assets/default.jpg"

const SavedNGOs = () => {
  const [savedNgos, setSavedNgos] = useState([]);
  const { url, userId } = useContext(UserContext);

  useEffect(() => {
    const fetchSavedNgos = async () => {
      try {
        const res = await axios.get(`${url}/api/user/savedNgos/${userId}`);
        if (res.data.success) {
          setSavedNgos(res.data.data); // this is an array of NGO objects
        }
      } catch (error) {
        console.error("Failed to fetch saved NGOs:", error);
      }
    };

    fetchSavedNgos();
  }, []);

  

  return (
    <div>
      <h1 className='text-3xl font-bold mb-10'>Saved NGOs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {savedNgos.map(ngo => (
          <div key={ngo._id} className="p-4  rounded shadow-md">
            <img src={ngo.ngoImage ? `${url}/images/${ngo.ngoImage}` : defaultImg} alt={ngo.name} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="text-lg font-bold">{ngo.name}</h3>
            <p className="text-sm text-gray-600">{ngo.location}</p>
            <p className="text-sm">{ngo.category}</p>
            {/* Add unsave button if you want */}
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedNGOs