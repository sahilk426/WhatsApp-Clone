import { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const AppContext = createContext();

function AppContextProvider({children}) {
    //all variables
    const [account,setAccount] = useState(null);
    const [selectedPerson,setSelectedPerson] = useState(''); 
    const [activeUsers,setActiveUsers] = useState();  
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    const socket = useRef();

    useEffect(() => {
        socket.current = io('ws://localhost:9000');
    }, []);

    //value send to consumer
    const value = {
        account,
        setAccount,
        selectedPerson,
        setSelectedPerson,
        socket,
        activeUsers,
        setActiveUsers,
        newMessageFlag,
        setNewMessageFlag
    };
    //this code will be always same
    return <AppContext.Provider value ={value}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider;