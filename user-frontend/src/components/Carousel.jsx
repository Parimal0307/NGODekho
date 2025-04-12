import React, {useState, useEffect} from 'react'
import { assets } from '../assets/assets'

const Carousel = () => {
    const img_list = [assets.ngo_img1, 
      assets.ngo_img3, 
      assets.ngo_img4, 
      assets.ngo_img1, 
      assets.ngo_img3, 
      assets.ngo_img4];
    const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? img_list.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === img_list.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-screen mx-auto overflow-hidden h-100">
    <div className="flex transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
      {img_list.map((src, index) => (
        <img key={index} src={src} alt={`Slide ${index}`} className="w-full flex-shrink-0 object-cover h-[400px]" />
      ))}
    </div>
    <button 
      onClick={prevSlide} 
      className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-xl cursor-pointer">
        <i class="fi fi-rr-angle-left "></i>
    </button>
    <button 
      onClick={nextSlide} 
      className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-xl cursor-pointer">
        <i class="fi fi-rr-angle-right"></i>
    </button>
  </div>
  )
}

export default Carousel