import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [ngoList, setNgoList] = useState([]);
    const [showLogin, setShowLogin] = useState(false);

    const fetchNgoList = async () => {
        const response = await axios.get(url+'/api/ngo/list');
        setNgoList(response.data.data);
    }

    useEffect(()=>{
        fetchNgoList();

        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            setUserId(localStorage.getItem('userId'));
        }        
    },[])
    
    const contextValue = {
        url,
        token, setToken,
        userId, setUserId,
        ngoList,
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