import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { NewContext } from './NewContext';
import { useParams } from 'react-router-dom';

const Requests = ({id}) => {
    const [requests, setRequests] = useState([]);
    const {url} = useContext(NewContext);

    const fetchRequests = async () => {
        try {
          const response = await axios.get(`${url}/api/ngo/requests/${id}`); // replace with your actual endpoint
          if (response.data.success) {
            setRequests(response.data.data);
          } else {
            console.log("Error:", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching requests:", error);
        }
      };

      const handleStatusChange = async (e, requestId) => {
        const newStatus = e.target.value;
    
        try {
          const res = await axios.put(`${url}/api/ngo/updaterequest`, {
            requestId: requestId,
            status: newStatus,
          });
    
          if (res.data.success) {
            // Update local state
            setRequests((prev) =>
              prev.map((r) =>
                r._id === requestId ? { ...r, status: newStatus } : r
              )
            );
          }
        } catch (err) {
          console.error("Failed to update status", err);
        }
      };

      useEffect(() => {
        fetchRequests();
      }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Volunteer Requests</h2>

      <div className="space-y-4">
          {/* Header Row */}
          <div className="grid grid-cols-[2fr_3fr_3fr_1fr_1fr_1fr] font-semibold text-gray-700 px-4 py-2 border-b border-gray-300">
            <div>Applicant</div>
            <div>Email</div>
            <div>Applied For</div>
            <div>Status</div>
            <div>Applied On</div>
            <div>Action</div>
          </div>

          {/* Request Rows */}
          {requests.map((req) => (
            <div
              key={req._id}
              className="grid grid-cols-[2fr_3fr_3fr_1fr_1fr_1fr] items-center text-sm text-gray-800 px-4 py-3 border border-gray-300 rounded-md shadow-sm"
            >
              <div>{req.userId?.name}</div>
              <div className="text-blue-600 underline">{req.userId?.email}</div>
              <div className="font-medium">{req.appliedFor}</div>
              <div
                className={
                  req.status === "Pending"
                    ? "text-yellow-600"
                    : req.status === "Approved"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {req.status}
              </div>
              <div>{new Date(req.appliedOn).toISOString().split("T")[0]}</div>
              <div>
                <select
                  onChange={(e) => handleStatusChange(e, req._id)}
                  disabled={req.status !== "Pending"}
                  className="border border-gray-300 rounded px-2 py-1 bg-white disabled:opacity-50"
                >
                  <option value="">Select</option>
                  <option value="Approved">Approve</option>
                  <option value="Rejected">Reject</option>
                </select>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Requests