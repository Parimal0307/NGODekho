import React, { useContext } from 'react'
import Footer from './Footer'
import { UserContext } from './UserContext'

const Filters = () => {
    const { ngoList } = useContext(UserContext);

    const catList = [...new Set(ngoList.map(ngo => ngo.category))];
    const locList = [...new Set(ngoList.map(ngo => ngo.location))];
    const cityList = locList.map(loc => loc.split(",")[0].trim());

    return (
        <div className='hidden md:flex md:w-[40%] lg:w-[25%] flex-col gap-5 px-12 py-8'>
            {/* Filter by category */}
            <div>
                <h4 className='text-base lg:text-xl font-semibold'>Types of service</h4>
                {
                    catList.map((item, index) => (
                        <div  key={index} className='flex gap-2 mt-2'>
                            <input className="cursor-pointer" type="checkbox" name="" id={item} />
                            <label className="cursor-pointer" for={item}>{item}</label>
                        </div>
                    ))
                }
            </div>
            {/* Filter by location */}
            <div>
                <h4 className='text-base lg:text-xl font-semibold'>Location</h4>
                {
                    cityList.map((item, index) => (
                        <div  key={index} className='flex gap-2 mt-2'>
                            <input type="checkbox" name="" id={item} />
                            <label for={item}>{item}</label>
                        </div>
                    ))
                }
            </div>

            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer '>
                Apply Filter
            </button>


            {/* Filter by Volunteering Opportunities */}
            {/* <div >
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
        </div> */}
            {/* Filter by Registration Requirements */}
            {/* <div>
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
        </div> */}
            <hr />
            <Footer />
        </div>
    )
}

export default Filters