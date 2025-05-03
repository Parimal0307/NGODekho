import React, { useState } from 'react'
import Footer from './Footer'

const Filters = ({ ngoList, onFilter }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);

    const catList = [...new Set(ngoList.map(ngo => ngo.category))];
    const locList = [...new Set(ngoList.map(ngo => ngo.location))];
    const cityList = locList.map(loc => loc.split(",")[0].trim());

    const handleCategoryChange = (e) => {
        const { id, checked } = e.target;
        setSelectedCategories(prev =>
            checked ? [...prev, id] : prev.filter(cat => cat !== id)
        );
    };

    const handleCityChange = (e) => {
        const { id, checked } = e.target;
        setSelectedCities(prev =>
            checked ? [...prev, id] : prev.filter(city => city !== id)
        );
    };

    const applyFilters = () => {
        onFilter({ categories: selectedCategories, cities: selectedCities });
    };

    return (
        <div className='hidden md:flex md:w-[30%] lg:w-[20%] flex-col gap-5 px-12 py-8'>
            {/* Filter by category */}
            <div>
                <h4 className='text-base lg:text-xl font-semibold'>Types of service</h4>
                {
                    catList.map((item, index) => (
                        <div key={index} className='flex gap-2 mt-2'>
                            <input
                                className="cursor-pointer"
                                type="checkbox"
                                id={item}
                                onChange={handleCategoryChange}
                            />
                            <label
                                className="cursor-pointer"
                                htmlFor={item}
                            >{item}
                            </label>
                        </div>
                    ))
                }
            </div>
            {/* Filter by location */}
            <div>
                <h4 className='text-base lg:text-xl font-semibold'>Location</h4>
                {
                    cityList.map((item, index) => (
                        <div key={index} className='flex gap-2 mt-2'>
                            <input
                                className="cursor-pointer"
                                type="checkbox"
                                id={item}
                                onChange={handleCityChange}
                            />
                            <label
                                className="cursor-pointer"
                                htmlFor={item}
                            >{item}
                            </label>
                        </div>
                    ))
                }
            </div>

            <button
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer '
                onClick={applyFilters}
            >
                Apply Filter
            </button>

            <hr />
            <Footer />
        </div>
    )
}

export default Filters

{/* Filter by Volunteering Opportunities */ }
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
{/* Filter by Registration Requirements */ }
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