import React, {useState} from 'react'
import {toast} from 'react-toastify'
import axios from 'axios';

const UploadImage = ({setshowUploadImage, setNgoImage, id, url}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
        alert("Please select an image to upload.");
        return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await axios.put(`${url}/api/ngo/uploadimage/${id}`, formData, {headers: { "Content-Type": "multipart/form-data" }});

            if (response.data.success) {
                toast.success("Image uploaded successfully!");
                setNgoImage(response.data.data.ngoImage);
                setSelectedFile(null);
                setPreviewImage(null);
                setshowUploadImage(false);
            }
        } catch (error) {
            toast.error("Error uploading image");
        }
    };
    
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
        <div className='relative bg-white p-5 rounded-lg w-[30%]  overflow-y-auto text-center'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>Upload Image</h1>
                <i 
                  class="fi fi-rr-cross cursor-pointer" 
                  onClick={()=>setshowUploadImage(false)}
                />
            </div>
            <form onSubmit={handleUpload} className='flex flex-col gap-4 mt-5'>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-2 border border-gray-300 p-2 rounded"
                />

                {previewImage && (
                        <div className="mt-4">
                        <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded border" />
                        </div>
                )}


              <button 
                type='submit'
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">Upload Image</button>
            </form>
        </div>
    </div>
  )
}

export default UploadImage