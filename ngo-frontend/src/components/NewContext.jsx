import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

export const NewContext = createContext(null);

const NewContextProvider = (props) => {
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");

    const contextValue = {
        url,
        token, setToken
    }

    return (
        <NewContext.Provider value={contextValue}>
            {props.children}
        </NewContext.Provider>
    )
}

export default NewContextProvider;