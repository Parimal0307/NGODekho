import React from 'react'
import Footer from './Footer'

const Filters = () => {
  return (
    <div className='hidden md:flex md:w-[40%] lg:w-[25%] flex-col gap-5 px-12 py-8'>
        <div>
            <h4 className='text-base lg:text-xl font-semibold'>Types of service</h4>
            <div className='flex gap-2 mt-2'>
                <input type="checkbox" name="" id="education" />
                <label for='education'>Education</label>
            </div>
            <div className='flex gap-2'>
                <input type="checkbox" name="" id="health" />
                <label for='health'>Health</label>
            </div>
            <div className='flex gap-2'>
                <input type="checkbox" name="" id="env" />
                <label for='env'>Environment</label>
            </div>
            <div className='flex gap-2'>
                <input type="checkbox" name="" id="cw" />
                <label for='cw'>Child Welfare</label>
            </div>
        </div>
        <div>
            <h4 className='text-base lg:text-xl font-semibold'>Location</h4>
            <div className='flex flex-col gap-1 lg:flex-row lg:gap-6 mt-2 '>
                <label for="search">City/Region</label>
                <div className='flex items-center justify-between border lg:w-[50%] border rounded-full px-3 py-0.5'>
                    <input id='search' type="text" placeholder='search' className='w-[90%] focus:outline-none'/>
                    <i class="fi fi-rr-search text-sm text-gray-400 cursor-pointer"></i>
                </div>
            </div>
            <div className='flex flex-col gap-1 lg:flex-row lg:gap-6 mt-2'>
                <label for="distance">Distance</label>
                <select name="" id="distance">
                    <option value="Within 5 km">Within 5 km</option>
                    <option value="Within 10 km">Within 10 km</option>
                    <option value="More than 10 km">More than 10 km</option>
                </select>
            </div>
        </div>
        <div >
            <h4 className='text-base lg:text-xl font-semibold'>Volunteering Opportunities</h4>
            <div className='flex gap-2 mt-2'>
                <input type="checkbox" name="" id="vr" />
                <label for='vr'>Volunteer Required</label>
            </div>
            <div className='flex gap-2'>
                <input type="checkbox" name="" id="io" />
                <label for='io'>Internship Opportunities</label>
            </div>
            <div className='flex gap-2'>
                <input type="checkbox" name="" id="rv" />
                <label for='rv'>Remote Volunteering</label>
            </div>
            <div className='flex gap-2'>
                <input type="checkbox" name="" id="ev" />
                <label for='ev'>One-Time Event Volunteering</label>
            </div>
        </div>
        <div>
            <h4 className='text-base lg:text-xl font-semibold'>Registration Requirements</h4>
            <div className='flex gap-2 mt-2'>
                <input type="checkbox" name="" id="nr" />
                <label for='nr'>No Registration Required</label>
            </div>
            <div className='flex gap-2'>
                <input type="checkbox" name="" id="fr" />
                <label for='fr'>Free Registration</label>
            </div>
            <div className='flex gap-2'>
                <input type="checkbox" name="" id="pr" />
                <label for='pr'>Paid Registration</label>
            </div>
        </div>
        <hr />
        <Footer/>
    </div>
  )
}

export default Filters