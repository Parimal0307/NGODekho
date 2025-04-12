import React, {useEffect, useState} from 'react'

const AddProgram = ({setShowAddProgram, programs, setPrograms, updateSection}) => {
  const [programDetails, setProgramDetails] = useState({
    title:'',
    description:''
  })

  const handleProgramDetail = (e) => {
    const { name, value } = e.target;
    setProgramDetails({ ...programDetails, [name]: value });
  };

  const updatePrograms = (e) => {
    e.preventDefault();
    programs.push(programDetails);
    updateSection({ programs });
    setShowAddProgram(false);
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
        <div className='relative bg-white p-5 rounded-lg w-[30%]  overflow-y-auto text-center'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>Add Program</h1>
                <i 
                  class="fi fi-rr-cross cursor-pointer" 
                  onClick={()=>setShowAddProgram(false)}/>
            </div>
            <form onSubmit={updatePrograms} className='flex flex-col gap-4 mt-5'>
                <input 
                    type="text" 
                    placeholder='Title'
                    name='title'
                    onChange={handleProgramDetail}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <input 
                type="text" 
                placeholder='Description' 
                name='description'
                onChange={handleProgramDetail}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <button 
                type='submit' 
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">Add Program</button>
            </form>
        </div>
    </div>
  )
}

export default AddProgram