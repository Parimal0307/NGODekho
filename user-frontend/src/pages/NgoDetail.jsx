import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../components/UserContext'
import Navbar from '../components/Navbar'
import LoginPopup from '../components/LoginPopup';
import img from '../assets/default.jpg'
import VolunteerPopup from '../components/VolunteerPopup'

const NgoDetail = () => {
  const {url, userId, showLogin, setShowLogin} = useContext(UserContext);
  const {id} = useParams();
  const [details, setDetails] = useState({});

  const [showApply, setShowApply] = useState(false);

  const ngoImg = details.ngoImage;
  const gallery = details.gallery;
  const programs = details.programs;
  
  
  const fetchDetails = async () => {
    try {
      const response = await axios.post(url+"/api/ngo/fetchdetails", {id});
     
      if(response.data.success){
        setDetails(response.data.data);
      }else{
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Some Error");
    }
  }

  useEffect(()=>{
          fetchDetails();
  },[])

  // Log details AFTER state updates
  // useEffect(() => {
  //   console.log(details._id, userId, programs);
  // }, [details]); // This runs when `details` state updates
  
  return (
    <>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <Navbar setShowLogin={setShowLogin}/>

      {showApply && <VolunteerPopup setShowApply={setShowApply} ngoId={details._id} programs={programs}/>}

      <div className='px-12'>
        {/* Name, contact and DP*/}
        <div className='flex flex-col-reverse gap-5 sm:flex-row justify-between py-8'>
          <div className='flex flex-col justify-between'>
            <h1 className='text-5xl font-bold'>{details.name}</h1>

            <div className='my-2 sm:my-0'>
              <p ><strong>Mission: </strong>{details.mission}</p>
              <p><strong>Location: </strong>{details.location}</p>
            </div>
            
            <div className='my-2 sm:my-0'>
              <h4 className='text-2xl font-medium'>Contact</h4>
              <p><strong>Email: </strong>{details.contact?.email}</p>
              <p><strong>Phone: </strong>{details.contact?.phone}</p>
              <p><strong>Website: </strong>{details.contact?.website}</p>  
            </div>
          </div>
          <div className='w-[100%] sm:w-100 h-70'>
            {
              ngoImg?
              <img src={`${url}/images/${ngoImg}`} alt="" className='w-full h-full rounded-2xl object-cover'/>:
              <img src={img} alt="" className='w-full h-full rounded-2xl object-cover'/>
            }
          </div>
        </div>
        
        <hr className='border-gray-400'/>

        {/* About us */}
        <div className='py-8'>
          <h1 className='text-3xl font-bold'>About Us</h1>
          <p>{details.about}</p>
        </div>

        <hr className='border-gray-400'/>

        {/* Our programs */}
        <div className='py-8'>
          <div className='flex gap-2 items-center justify-between'>
            <h1 className='text-3xl font-bold'>Our Programs</h1>
            {
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer" onClick={()=>setShowApply(true)}>Volunteer Now</button>
            }
          </div>
          <div className="mt-4 bg-white p-6 shadow rounded-lg">
            {details.programs && details.programs.length > 0 ? (
              details.programs.map((program, index) => (
                <div key={index}>
                  {index !== 0 && <hr className="my-3 border-gray-300" />}
                  <p><strong>Title:</strong> {program.title}</p>
                  <p><strong>Description:</strong> {program.description}</p>
                </div>
              ))
            ) : (
              <p>No programs available</p>
            )}
          </div>
        </div>
        

        {/* <hr /> */}
        {/* success stories */}
        <div className='py-4'>
          <h1 className='text-3xl font-bold'>Success Stories</h1>
          <div className="mt-4 bg-white p-6 shadow rounded-lg">
            {details.success_stories && details.success_stories.length > 0 ? (
              details.success_stories.map((story, index) => (
                <div key={index}>
                  {index !== 0 && <hr className="my-3 border-gray-300" />}
                  <p><strong>Title:</strong> {story.title}</p>
                  <p><strong>Story:</strong> {story.story}</p>
                </div>
              ))
            ) : (
              <p>No programs available</p>
            )}
          </div>
        </div>

        {/* <hr /> */}
        {/* Gallery */}
        <div className='py-8'>
          <h1 className='text-3xl font-bold'>Gallery</h1>
          <div className='flex space-x-4 overflow-x-auto mt-4 rounded-lg no-scrollbar'>
            {gallery && gallery.length > 0 ? (gallery.map((item, index)=>(
              <img key={index} src={`${url}/images/${item}`} alt={`image${index + 1}`} className='w-56 h-56 object-cover rounded-lg'/>
            ))) : <img src={img} alt={"default Image"} className='w-56 h-56 object-cover rounded-lg'/>}
          </div>
        </div>
      </div>
    </>
  )
}

export default NgoDetail