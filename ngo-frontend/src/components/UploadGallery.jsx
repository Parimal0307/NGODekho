import React, {useState} from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'

const UploadGallery = ({setshowUploadGallery, setGallery, id, url}) => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
  
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
  
      const previews = files.map(file => URL.createObjectURL(file));
      setPreviewImages(previews);
    };
  
    const handleUpload = async (e) => {
        e.preventDefault();

      if (selectedFiles.length === 0) {
        alert("Please select images to upload.");
        return;
      }
  
      const formData = new FormData();
      selectedFiles.forEach(file => formData.append("images", file));
  
      try {
        const response = await axios.put(`${url}/api/ngo/uploadgallery/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        if (response.data.success) {
          toast.success("Images uploaded successfully!");
          console.log(selectedFiles);
          setSelectedFiles([]);
          setPreviewImages([]);
        }
      } catch (error) {
        toast.error("Error uploading images");
      }
    };
    
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
        <div className='relative bg-white p-5 rounded-lg w-[30%]  overflow-y-auto text-center'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>Gallery</h1>
                <i 
                  class="fi fi-rr-cross cursor-pointer" 
                  onClick={()=>setshowUploadGallery(false)}
                />
            </div>
            <form onSubmit={handleUpload} className='flex flex-col gap-4 mt-5'>

            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2 block w-full border border-gray-300 p-2 rounded"
            />

            <div className="mt-4 flex flex-wrap gap-2">
                {previewImages.map((src, index) => (
                <img key={index} src={src} alt={`preview-${index}`} className="w-24 h-24 object-cover rounded" />
                ))}
            </div>
              <button 
                type='submit'
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">Upload Images</button>
            </form>
        </div>
    </div>
  )
}

export default UploadGallery