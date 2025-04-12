import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NgoDetail from './pages/NgoDetail';

const App = () => {
  

  return (
    <div>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/ngo-detail/:id' element={<NgoDetail/>}/>
      </Routes>
    </div>
  )
}

export default App