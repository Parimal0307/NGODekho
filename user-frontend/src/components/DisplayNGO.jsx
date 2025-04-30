import React, { useContext } from 'react'
import {ngo_list} from '../assets/assets.js'
import NgoItem from './NgoItem.jsx'
import ngo_img1 from '../assets/image1.png'
import { UserContext } from './UserContext.jsx'

const DisplayNGO = () => {

  const {ngoList} = useContext(UserContext);
  
  return (
    <div className='md:w-[75%] p-8 grid grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-x-6 gap-y-6'>
        {
          ngoList.map((item, index)=>{
            return <NgoItem key={index} id={item._id} name={item.name} category={item.category} location={item.location} mission={item.mission} volNeeded={item.volunteers_needed} rating={item.rating} reviews={item.reviews} image={item.ngoImage}/>
          })
        } 
    </div>
  )
}

export default DisplayNGO