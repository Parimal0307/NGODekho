import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"

export const NewContext = createContext(null);

const NewContextProvider = (props) => {
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [ngoId, setNgoId] = useState("");
    const navigate = useNavigate();

    const contextValue = {
        url,
        token, setToken,
        ngoId, setNgoId
    }

    useEffect(()=>{
        const storedToken = localStorage.getItem("ngoToken");
        const storedId = localStorage.getItem("ngoId");

        if(storedToken && storedId){
            setToken(storedToken);
            setNgoId(storedId);
            navigate(`/home/${storedId}`);
        }
    }, [])

    return (
        <NewContext.Provider value={contextValue}>
            {props.children}
        </NewContext.Provider>
    )
}

export default NewContextProvider;