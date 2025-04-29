import React from 'react'

const Logout = ({logOut, setShowLogout}) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
        <div className='relative bg-white p-5 rounded-lg w-[30%]  overflow-y-auto text-center'>
            <h1 className='text-2xl font-bold'>Do you really want to logout?</h1>
            <div className='flex justify-end gap-5 mt-5 mr-9'>
              <span onClick={()=>logOut()} className='text-xl text-red-600 cursor-pointer'>Yes</span>
              <span onClick={()=>setShowLogout(false)} className='text-xl text-gray-500 cursor-pointer'>No</span>
            </div>
        </div>
    </div>
  )
}

export default Logout