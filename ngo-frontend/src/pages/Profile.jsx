import React, { useContext, useState, useEffect } from 'react'
import EditDetails from '../components/EditDetails';
import EditContact from '../components/EditContact';
import AddProgram from '../components/AddProgram';
import AddStory from '../components/AddStory';
import UploadImage from '../components/UploadImage';
import UploadGallery from '../components/UploadGallery';
import { NewContext } from '../components/NewContext';
import { useParams } from 'react-router-dom'
import default_img from '../assets/default.jpg'
import axios from 'axios';

const Profile = () => {
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [showEditContact, setShowEditContact] = useState(false);
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [showAddStory, setShowAddStory] = useState(false);
  const [showUploadImage, setshowUploadImage] = useState(false);
  const [showUploadGallery, setshowUploadGallery] = useState(false);

  const {url} = useContext(NewContext);
  const {id} = useParams();
  const [ngo, setNgo] = useState(null);
  const [basicDetails, setBasicDetails] = useState({
    name: "",
    category: "",
    location: "",
    about: "",
    mission: "",
  });

  const [contactDetails, setContactDetails] = useState({
    email: "",
    phone: "",
    website: "",
  });

  const [volunteerStatus, setVolunteerStatus] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [successStories, setSuccessStories] = useState([]);

  const [ngoImage, setNgoImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  // Fetch NGO details
  useEffect(() => {
    axios
      .post(url+"/api/ngo/fetchdetails", {id})
      .then((response) => {
        if (response.data.success) {
          const data = response.data.data;
          setNgo(data);

          setBasicDetails({
            name: data.name || "",
            category: data.category || "",
            location: data.location || "",
            about: data.about || "",
            mission: data.mission || "",
          });

          setContactDetails({
            email: data.contact?.email || "",
            phone: data.contact?.phone || "",
            website: data.contact?.website || "",
          });

          setVolunteerStatus(data.volunteers_needed || false);
          setPrograms(data.programs || []);
          setSuccessStories(data.success_stories || []);

          setNgoImage(data.ngoImage || ""); // Store single NGO image
          setGallery(data.gallery || []); // Store gallery images
        }
      })
      .catch(() => console.log("Error fetching NGO details"));
  }, [id]);


  // Common API function to update sections
  const updateSection = async (sectionData) => {
    try {
      const response = await axios.put(url+"/api/ngo/updatedetails/"+id, sectionData);
      if (response.data.success) {
        alert("Updated successfully!");
      }
    } catch (error) {
      console.log("Error updating data");
    }
  };

  
  return (
    <div className="flex flex-col p-7.5">
      {showEditDetails?<EditDetails setShowEditDetails={setShowEditDetails} basicDetails={basicDetails} setBasicDetails={setBasicDetails} updateSection={updateSection}/>:<></>}
      {showEditContact?<EditContact setShowEditContact={setShowEditContact} contactDetails={contactDetails} setContactDetails={setContactDetails} updateSection={updateSection}/>:<></>}
      {showAddProgram?<AddProgram setShowAddProgram={setShowAddProgram} programs={programs} setPrograms={setPrograms} updateSection={updateSection}/>:<></>}
      {showAddStory?<AddStory setShowAddStory={setShowAddStory} successStories={successStories} updateSection={updateSection}/>:<></>}
      {showUploadImage?<UploadImage setshowUploadImage={setshowUploadImage} setNgoImage={setNgoImage} id={id} url={url}/>:<></>}
      {showUploadGallery?<UploadGallery setshowUploadGallery={setshowUploadGallery} setGallery={setGallery} id={id} url={url}/>:<></>}

      <h1 className="text-3xl font-bold">NGO Profile</h1>

      {/* NGO image */}
      <div className="flex-1 mt-8">
        <div className='flex gap-2 items-center justify-between'>
          <h2 className="text-2xl font-medium">NGO Image</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer" onClick={()=>setshowUploadImage(true)}>Upload Image</button>
        </div>
        {!ngoImage? 
          <div className="mt-4">
            <img src={default_img} alt="NGO" className="w-48 h-48 object-cover rounded" />
          </div>
        :(
        <div className="mt-4">
          <img src={`${url}/images/${ngoImage}`} alt="NGO" className="w-48 h-48 object-cover rounded" />
        </div>
      )}
      </div>
      
      {/* Basic Details */}
      <div className="flex-1 mt-8">
        <div className='flex gap-2 items-center justify-between'>
          <h2 className="text-2xl font-medium">Basic Details</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer" onClick={()=>setShowEditDetails(true)}>Edit details</button>
        </div>
        <div className="mt-4 bg-white p-6 shadow rounded-lg">
          <p><strong>Name:</strong> {basicDetails.name}</p>
          <p><strong>Category:</strong> {basicDetails.category}</p>
          <p><strong>Location:</strong> {basicDetails.location}</p>
          <p><strong>About:</strong> {basicDetails.about}</p>
          <p><strong>Mission:</strong> {basicDetails.mission}</p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="flex-1 mt-5">
        <div className='flex gap-2 items-center justify-between'>
          <h2 className="text-2xl font-medium">Contact Details</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer" onClick={()=>setShowEditContact(true)}>Edit details</button>
        </div>
        <div className="mt-4 bg-white p-6 shadow rounded-lg">
          <p><strong>Email:</strong> {contactDetails.email}</p>
          <p><strong>Phone:</strong> {contactDetails.phone}</p>
          <p><strong>Website:</strong> {contactDetails.website}</p>
        </div>
      </div>

      {/* Programs */}
      <div className="flex-1 mt-5">
        <div className='flex gap-2 items-center justify-between'>
          <h2 className="text-2xl font-medium">Ongoing Programs</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer" onClick={()=>setShowAddProgram(true)}>Add Program</button>
        </div>
        <div className="mt-4 bg-white p-6 shadow rounded-lg">
          {
            programs.length===0?(<p>No programs available</p>):
            programs.map((item, index)=>(
              <React.Fragment key={index}>
                {index !== 0 && <hr className='my-3 border-gray-300' />}
                <p><strong>Title:</strong> {item.title}</p>
                <p><strong>Description:</strong> {item.description}</p>
              </React.Fragment>
            ))
          }
        </div>
      </div>

      {/* Success Stories */}
      <div className="flex-1 mt-5">
        <div className='flex gap-2 items-center justify-between'>
          <h2 className="text-2xl font-medium">Success Stories</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer" onClick={()=>setShowAddStory(true)}>Add Story</button>
        </div>
        <div className="mt-4 bg-white p-6 shadow rounded-lg">
          {
            successStories.length===0?(<p>No stories available</p>):
            successStories.map((item, index)=>(
              <React.Fragment key={index}>
                {index !== 0 && <hr className='my-3 border-gray-300' />}
                <p><strong>Title:</strong> {item.title}</p>
                <p><strong>Story:</strong> {item.story}</p>
              </React.Fragment>
            ))
          }
        </div>
      </div>

      {/* Gallery */}
      <div className="flex-1 mt-5">
        <div className='flex gap-2 items-center justify-between'>
          <h2 className="text-2xl font-medium">Gallery</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer" onClick={()=>setshowUploadGallery(true)}>Upload Images</button>
        </div>
        {!gallery.length > 0 ?
        <div className="mt-4">
          <img src={default_img} alt="NGO" className="w-40 h-40 object-cover rounded" />
        </div>
        : (
          <div className="mt-4">
            <div className="flex space-x-4 overflow-x-auto mt-4 rounded-lg no-scrollbar">
              {gallery.map((image, index) => (
                <img key={index} src={`${url}/images/${image}`} alt={`Gallery ${index}`} className="w-40 h-40 object-cover rounded" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile