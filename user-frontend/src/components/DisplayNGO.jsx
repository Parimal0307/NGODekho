import React, { useContext } from 'react'
import NgoItem from './NgoItem.jsx'

const DisplayNGO = ({ngoList}) => {

  return (
    <div className='md:w-[75%] h-[100px] p-8 grid grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-x-6 gap-y-6'>
        {
          ngoList.map((item, index)=>{
            return <NgoItem 
            key={index} 
            id={item._id} 
            name={item.name} 
            category={item.category} 
            location={item.location} 
            mission={item.mission} 
            volNeeded={item.volunteers_needed} 
            rating={item.rating} 
            reviews={item.reviews} 
            image={item.ngoImage}/>
          })
        } 
    </div>
  )
}

export default DisplayNGO