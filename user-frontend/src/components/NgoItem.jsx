import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import defaultImg from '../assets/default.jpg'
import { UserContext } from './UserContext'

const NgoItem = ({ id, name, category, location, mission, volNeeded, rating, reviews, image }) => {

  const { url } = useContext(UserContext);
  const [saveState, setSaveState] = useState('save');
  const navigate = useNavigate();

  return (
    <div className='bg-white shadow-lg rounded-2xl p-8 flex items-center gap-6 w-full'>
      <div className="flex-1">
        <h1 className="text-xl font-bold">{name}</h1>
        <h2 className="text-gray-600 font-semibold">{category}</h2>
        <h2 className="text-gray-500">{location}</h2>
        <p className="mt-2 text-gray-700 text-sm">{mission}</p>
        {volNeeded ? <p className="mt-2 font-semibold">Volunteers Needed</p> : <></>}
        <p className="text-gray-600 text-sm mt-2 font-medium">Rating: {rating}/5 ({reviews} reviews)</p>
        <div className='flex gap-4 mt-4'>
          <div className='flex gap-1 cursor-pointer hover:text-gray-700' onClick={() => {
            saveState === 'save' ? setSaveState('unsave') : setSaveState('save');
          }}>
            {
              saveState === 'save' ? <i class="fi fi-rs-bookmark mt-0.5"></i> :
                <i class="fi fi-ss-bookmark mt-0.5"></i>
            }
            <p>{saveState}</p>
          </div>
          <div className='flex gap-1 cursor-pointer hover:text-gray-700' onClick={() => {
            navigate(`/ngo-detail/${id}`),
              window.scrollTo(0, 0);
          }}>
            <i class="fi fi-rr-document mt-0.5"></i>
            <p>View Details</p>
          </div>
        </div>
      </div>
      <div className="w-46 h-46 flex-shrink-0">
        {image ?
          <img src={`${url}/images/${image}`} alt="" className="w-full h-full rounded-lg object-cover" /> :
          <img src={defaultImg} alt="" className="w-full h-full rounded-lg object-cover" />}

      </div>
    </div>
  )
}

export default NgoItem