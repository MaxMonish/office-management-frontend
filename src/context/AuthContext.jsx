import React from "react";
import {createContext, useState, useEffect} from "react";
import {getProfileApi} from "../api/authApi";
import socket from "../socket";

export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    loading: true
});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        let isMounted = true;
        
        const loadUser = async () => {
            const token = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");
            
            if(storedUser && isMounted){
                setUser(JSON.parse(storedUser));
            }
            
            if(!token){
                if (isMounted) setLoading(false);
                
                return;
            }
            
            try{
                const profile = await getProfileApi();
                
                if(isMounted){
                    const finalUser = profile.user || profile;
                    setUser(finalUser);
                    localStorage.setItem("user", JSON.stringify(finalUser));
                }
            }catch(err){
                console.error("Failed to load user:", err);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                socket.disconnect();
                
                if (isMounted) setUser(null);
            }finally{
                if (isMounted) setLoading(false);
            }
        };
        
        loadUser();
        
        return () => {
            isMounted = false;
        };
    }, []);
    
    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        
        socket.connect();
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        socket.disconnect();
        
        setUser(null);
    };

    return(
    <AuthContext.Provider value={{user, login, logout, loading}}>
        {children}
    </AuthContext.Provider>
    );
};