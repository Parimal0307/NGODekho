import React from 'react'

const EditContact = ({setShowEditContact, contactDetails, setContactDetails, updateSection}) => {

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };

  const updateContactDetails = (e) => {
    e.preventDefault();
    updateSection({ contact: contactDetails });
    setShowEditContact(false);
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
        <div className='relative bg-white p-5 rounded-lg w-[30%]  overflow-y-auto text-center'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>Edit Contact</h1>
                <i 
                  class="fi fi-rr-cross cursor-pointer" 
                  onClick={()=>setShowEditContact(false)}/>
            </div>
            <form onSubmit={updateContactDetails} className='flex flex-col gap-4 mt-5'>
                <input 
                    type="email" 
                    placeholder='Email'
                    name='email'
                    value={contactDetails.email}
                    onChange={handleContactChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <input 
                type="phone" 
                placeholder='Phone' 
                name='phone'
                value={contactDetails.phone}
                onChange={handleContactChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <input 
                type="text" 
                placeholder='Website' 
                name='website'
                value={contactDetails.website}
                onChange={handleContactChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <button 
                type='submit' 
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">Update Contact</button>
            </form>
        </div>
    </div>
  )
}

export default EditContact