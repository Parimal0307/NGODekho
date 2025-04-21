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

    const fetchNgoList = async () => {
        const response = await axios.get(url+'/api/ngo/list');
        setNgoList(response.data.data);
    }

    const fetchUserDetails = async (id) => {
        try {
          const response = await axios.get(`${url}/api/user/fetchDetails/${id}`);
          setUserDetails(response.data.data); // Use response.data
        //   console.log(response.data.data);
        } catch (err) {
          console.error("Error fetching user details:", err);
        }
      };

    useEffect(()=>{
        fetchNgoList();

        const storedToken = localStorage.getItem("token");
        const storedUserId = localStorage.getItem("userId");

        if (storedToken && storedUserId) {
            setToken(storedToken);
            setUserId(storedUserId);
            fetchUserDetails(storedUserId); // Pass directly here
        }       
    },[])
    
    const contextValue = {
        url,
        token, setToken,
        userId, setUserId,
        ngoList,
        userDetails,
        showLogin ,setShowLogin
        // saveState, setSaveState
    }
    
    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;