import React, { useContext } from 'react'
import { UserContext } from '../components/UserContext';

const MyApplications = () => {
  const { url, ngoRequests } = useContext(UserContext);

  return (
    <div>
      <h1 className='text-3xl font-bold mb-10'>My Applications</h1>

      {ngoRequests.map((req, index) => (
        <div key={index} className="shadow p-4 rounded-md mb-4 flex items-center gap-4 border-l-4"
          style={{
            borderColor:
              req.status === "Pending" ? "orange" :
                req.status === "Approved" ? "green" :
                  "red"
          }}>
          <img src={`${url}/images/${req.ngoId.ngoImage}`} alt="NGO" className="w-16 h-16 rounded-md object-cover" />
          <div className="flex-1">
            <h2 className="font-bold text-lg">{req.ngoId.name}</h2>
            <p><b>Role Applied:</b> {req.appliedFor}</p>
            <p><b>Applied On:</b> {new Date(req.appliedOn).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p><b>Status:</b>
              <span className={
                req.status === "Pending" ? "text-yellow-500" :
                  req.status === "Approved" ? "text-green-500" :
                    "text-red-500"
              }> {req.status}</span>
            </p>
            <button className="text-sm text-gray-600 hover:underline mt-2">Cancel Application</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyApplications