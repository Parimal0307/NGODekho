import React from 'react'

const Footer = () => {
  return (
    <div>
        <div className="flex gap-4 mb-3 text-gray-700">
          <i className="fi fi-brands-facebook text-xl cursor-pointer"></i>
          <i className="fi fi-brands-linkedin text-xl cursor-pointer"></i>
          <i className="fi fi-brands-instagram text-xl cursor-pointer"></i>
          <i className="fi fi-brands-twitter text-xl cursor-pointer"></i>
        </div>
        <p className='text-xs'>About</p>
        <p className='text-xs'>Privacy Policy</p>
        <p className='text-xs'>Terms & Conditions</p>
        <p className='text-xs'><span className='font-bold'>NGODekho</span> © 2025 | All Rights Reserved</p>
    </div>
  )
}

export default Footer