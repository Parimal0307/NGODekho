import React, {useState, useRef, useContext} from 'react'
import userImg from "../assets/user.png"
import axios  from 'axios';
import { UserContext } from './UserContext';

const UpdateImage = ({setShowUpdateImage, dp}) => {
  const {url, userId} = useContext(UserContext);
  const [preview, setPreview] = useState(`${url}/images/${dp}` || userImg); // Replace with your default user image path
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
        if (!preview) {
          alert("Please select an image to upload.");
          return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await axios.put(`${url}/api/user/uploadImage/${userId}`, formData, {headers: { "Content-Type": "multipart/form-data" }});

            if (response.data.success) {
                alert("Image uploaded successfully!");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image.");
        }
  }

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
        <div className='relative bg-white p-5 rounded-lg w-[30%]  overflow-y-auto text-center'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>Update Image</h1>
                <i 
                  class="fi fi-rr-cross cursor-pointer" 
                  onClick={()=>setShowUpdateImage(false)}/>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-5'>
            {/* Image Preview with overlay */}
            <div className='relative w-40 h-40 mx-auto rounded-full overflow-hidden group'>
              <img
                src={preview}
                alt="Profile Preview"
                className='w-full h-full object-cover'
              />
              <div 
                onClick={handleClick}
                className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition'
              >
                <i className="fi fi-rr-pencil text-white text-2xl"></i>
              </div>
            </div>

            {/* Hidden input for file */}
            <input 
              type='file' 
              ref={fileInputRef}
              onChange={handleImageChange}
              accept='image/*'
              className='hidden'
            />
                
              <button
                type='submit' 
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">Update Image</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateImage