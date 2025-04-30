import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import LoginPopup from '../components/LoginPopup';
import Filters from '../components/Filters';
import DisplayNGO from '../components/DisplayNGO';
import { UserContext } from '../components/UserContext';
import Carousel from '../components/Carousel';

const Home = () => {
  const { showLogin, setShowLogin, ngoList } = useContext(UserContext);
  const [filteredNgos, setFilteredNgos] = useState([]);

  useEffect(() => {
    setFilteredNgos(ngoList);
  }, [ngoList]);

  const handleFilter = ({ categories, cities }) => {
    const filtered = ngoList.filter(ngo => {
      const matchCategory = categories.length === 0 || categories.includes(ngo.category);
      const ngoCity = ngo.location.split(",")[0].trim();
      const matchCity = cities.length === 0 || cities.includes(ngoCity);
      return matchCategory && matchCity;
    });
    setFilteredNgos(filtered);
  };

  return (
    <div className='bg-[#F8F8F8]'>
      <Navbar setShowLogin={setShowLogin} />
      <Carousel />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

    
      <div className='flex'>
        <Filters ngoList={ngoList} onFilter={handleFilter} />
        <DisplayNGO ngoList={filteredNgos} />
      </div>
    </div>
  )
}

export default Home