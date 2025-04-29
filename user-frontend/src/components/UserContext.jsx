import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [ngoList, setNgoList] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [showLogin, setShowLogin] = useState(false);
    const [savedNgos, setSavedNgos] = useState([]);
    const [ngoRequests, setNgoRequests] = useState([]);

    const fetchNgoList = async () => {
        const response = await axios.get(url + '/api/ngo/list');
        setNgoList(response.data.data);
    }

    const fetchUserDetails = async (id) => {
        try {
            const response = await axios.get(`${url}/api/user/fetchDetails/${id}`);
            setUserDetails(response.data.data); // Use response.data
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    };

    const fetchSavedNgos = async () => {
        try {
            const res = await axios.get(`${url}/api/user/savedNgos/${userId}`);
            if (res.data.success) {
                setSavedNgos(res.data.data); // this is an array of NGO objects
            }
        } catch (error) {
            console.error("Failed to fetch saved NGOs:", error);
        }
    };

    const fetchVolunteerRequests = async () => {
        try {
          const res = await axios.get(`${url}/api/user/volunteerRequests/${userId}`);
          if (res.data.success) {
            setNgoRequests(res.data.data);
          }
        } catch (err) {
          console.error("Error fetching NGOs:", err);
        }
      };

    useEffect(() => {
        fetchNgoList();

        const storedToken = localStorage.getItem("token");
        const storedUserId = localStorage.getItem("userId");

        if (storedToken && storedUserId) {
            setToken(storedToken);
            setUserId(storedUserId);
            fetchUserDetails(storedUserId); // Pass directly here
        }
    }, [])

    useEffect(() => {
        if (!userId) return; // ✅ Wait until userId is loaded from localStorag

        fetchSavedNgos();
        fetchVolunteerRequests();
      }, [userId]); 

    const contextValue = {
        url,
        token, setToken,
        userId, setUserId,
        ngoList,
        userDetails,
        showLogin, setShowLogin,
        savedNgos, ngoRequests
    }

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;