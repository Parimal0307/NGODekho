import React, { useContext } from 'react'
import { UserContext } from '../components/UserContext'
import EditDetails from '../components/EditDetails';
import { useState } from 'react';
import UpdateImage from '../components/UpdateImage';

const MyProfile = () => {
  const {userDetails} = useContext(UserContext);
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [showUpdateImage, setShowUpdateImage] = useState(false);

  return (
    <div>
      {showEditDetails && <EditDetails setShowEditDetails={setShowEditDetails}/>}
      {showUpdateImage && <UpdateImage setShowUpdateImage={setShowUpdateImage} dp={userDetails.dp}/>}
      <h1 className='text-3xl font-bold'>My Profile</h1>
      <h3 className='text-2xl font-semibold text-gray-500'>Welcome, {!userDetails.username?"User":userDetails.username}!</h3>

      <div className="mt-8">
          <p><strong>Full Name:</strong> {!userDetails.fullName?"________ ________":userDetails.fullName}</p>
          <p><strong>Phone:</strong> {!userDetails.phone?"XXXXXXXXXX":userDetails.phone}</p>
          <p><strong>Location:</strong> {!userDetails.location?"___________":userDetails.location}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer mt-4" onClick={()=>setShowEditDetails(true)}>Edit details</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer mt-4 ml-4" onClick={()=>setShowUpdateImage(true)}>Update Image</button>
      </div>

      <hr className='my-4'/>

      <div className='h-[150px]'>
        <h3 className='text-2xl font-bold'>Volunteer & Activity Stats</h3>
      </div>

      <hr className='my-4'/>

      <div className='h-[150px]'>
        <h3 className='text-2xl font-bold'>My skills & Interests</h3>
      </div>
    </div>
  )
}

export default MyProfile