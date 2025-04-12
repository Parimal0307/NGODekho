import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Requests from '../components/Requests';

const Dashboard = () => {
  const {id} = useParams();


  return (
    <div className="flex p-7.5 flex-col">
      <div className="flex-1">
        <h1 className="text-3xl font-bold">Welcome to NGO Dashboard</h1>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow rounded-lg">Total Volunteers: 150</div>
          <div className="p-4 bg-white shadow rounded-lg">Ongoing Programs: 5</div>
          <div className="p-4 bg-white shadow rounded-lg">Success Stories: 20</div>
        </div>
      </div>
      <Requests id={id}/>
    </div>
  )
}

export default Dashboard