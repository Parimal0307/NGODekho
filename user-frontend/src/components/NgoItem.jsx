import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import defaultImg from '../assets/default.jpg'
import { UserContext } from './UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const NgoItem = ({ id, name, category, location, mission, volNeeded, rating, reviews, image }) => {

  const { url, userId, userDetails } = useContext(UserContext);
  const [saveState, setSaveState] = useState('save');
  const navigate = useNavigate();
  const [savedNgos, setSavedNgos] = useState(userDetails.savedNGOs || []);

  const handleSaveToggle = async (ngoId) => {
    const isSaved = savedNgos.includes(ngoId);

    try {
      if (isSaved) {
        const res = await axios.post(`${url}/api/user/unsaveNgo/${userId}`, { ngoId });
        if (res.data.success) {
          setSavedNgos(prev => prev.filter(id => id !== ngoId));
          toast.success("NGO unsaved");
        }
      } else {
        const res = await axios.post(`${url}/api/user/saveNgo/${userId}`, { ngoId });
        if (res.data.success) {
          setSavedNgos(prev => [...prev, ngoId]);
          toast.success("NGO saved");
        }
      }
    } catch (error) {
      toast.error("Error toggling save");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col lg:flex-row gap-6 w-full h-full">
      {/* Image */}
      <div className="w-full lg:w-1/3 flex-shrink-0">
        {image ? (
          <img
            src={`${url}/images/${image}`}
            alt={name}
            className="w-full h-48 lg:h-full object-cover rounded-lg"
          />
        ) : (
          <img
            src={defaultImg}
            alt="default"
            className="w-full h-48 lg:h-full object-cover rounded-lg"
          />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold">{name}</h1>
          <h2 className="text-gray-600 font-semibold">{category}</h2>
          <h2 className="text-gray-500">{location}</h2>
          {mission && <p className="mt-2 text-gray-700 text-sm">{mission}</p>}
          {volNeeded && <p className="mt-2 font-semibold text-red-500">Volunteers Needed</p>}
          <p className="text-gray-600 text-sm mt-2 font-medium">
            Rating: {rating}/5 ({reviews} reviews)
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-4 text-blue-600 text-sm">
          {/* Save Button */}
          <div
            className="flex gap-1 items-center cursor-pointer hover:text-gray-700"
            onClick={() => handleSaveToggle(id)}
          >
            {savedNgos.includes(id) ? (
              <i className="fi fi-ss-bookmark mt-0.5"></i>
            ) : (
              <i className="fi fi-rs-bookmark mt-0.5"></i>
            )}
            <p>{savedNgos.includes(id) ? 'Saved' : 'Save'}</p>
          </div>

          {/* View Details */}
          <div
            className="flex gap-1 items-center cursor-pointer hover:text-gray-700"
            onClick={() => {
              navigate(`/ngo-detail/${id}`);
              window.scrollTo(0, 0);
            }}
          >
            <i className="fi fi-rr-document mt-0.5"></i>
            <p>View Details</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NgoItem