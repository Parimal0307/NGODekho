import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NgoDetail from './pages/NgoDetail';
import Profile from './pages/Profile';
import MyProfile from './pages/MyProfile';
import MyApplications from './pages/MyApplications';
import SavedNGOs from './pages/SavedNGOs';

const App = () => {
  

  return (
    <div>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/ngo-detail/:id' element={<NgoDetail/>}/>
        <Route path='/profile' element={<Profile/>}>
          <Route index element={<MyProfile/>}/>
          <Route path='myapplications' element={<MyApplications/>}/>
          <Route path='savedngos' element={<SavedNGOs/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App