import React, {useEffect} from 'react'

const EditDetails = ({setShowEditDetails, basicDetails, setBasicDetails, updateSection}) => {

    const handleBasicChange = (e) => {
      const { name, value } = e.target;
      setBasicDetails({ ...basicDetails, [name]: value });
    };

    const updateBasicDetails = (e) => {
      e.preventDefault();
      updateSection(basicDetails);
      setShowEditDetails(false);
    };

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
        <div className='relative bg-white p-5 rounded-lg w-[30%]  overflow-y-auto text-center'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>Edit Details</h1>
                <i 
                  class="fi fi-rr-cross cursor-pointer" 
                  onClick={()=>setShowEditDetails(false)}/>
            </div>
            <form onSubmit={updateBasicDetails} className='flex flex-col gap-4 mt-5'>
                <input 
                    type="text" 
                    placeholder='Name'
                    name='name'
                    value={basicDetails.name}
                    onChange={handleBasicChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <input 
                type="text" 
                placeholder='Category' 
                name='category'
                value={basicDetails.category}
                onChange={handleBasicChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <input 
                type="text" 
                placeholder='Location' 
                name='location'
                value={basicDetails.location}
                onChange={handleBasicChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <input 
                type="text" 
                placeholder='About'
                name='about'
                value={basicDetails.about}
                onChange={handleBasicChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <input 
                type="text" 
                placeholder='Mission'
                name='mission'
                value={basicDetails.mission}
                onChange={handleBasicChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <button 
                type='submit' 
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">Update Details</button>
            </form>
        </div>
    </div>
  )
}

export default EditDetails