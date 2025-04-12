import React, {useState} from 'react'

const AddStory = ({setShowAddStory, successStories, updateSection}) => {

  const [storyDetails, setStoryDetails] = useState({
      title:'',
      story:''
    })

    const handleStoryDetail = (e) => {
      const { name, value } = e.target;
      setStoryDetails({ ...storyDetails, [name]: value });
    };

    const updateStory = (e) => {
      e.preventDefault();
      successStories.push(storyDetails);
      updateSection({success_stories: successStories});
      setShowAddStory(false);
    };

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
        <div className='relative bg-white p-5 rounded-lg w-[30%]  overflow-y-auto text-center'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>Add Story</h1>
                <i 
                  class="fi fi-rr-cross cursor-pointer" 
                  onClick={()=>setShowAddStory(false)}/>
            </div>
            <form onSubmit={updateStory} className='flex flex-col gap-4 mt-5'>
                <input 
                    type="text" 
                    placeholder='Title'
                    name='title'
                    onChange={handleStoryDetail}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <input 
                type="text" 
                placeholder='Story' 
                name='story'
                onChange={handleStoryDetail}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
              <button 
                type='submit' 
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">Add Story</button>
            </form>
        </div>
    </div>
  )
}

export default AddStory