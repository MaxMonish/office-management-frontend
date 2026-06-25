import React from "react";
import {useContext} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "./AuthContext";

const ProtectedRoute = ({children, roleRequired}) => {
    const {user, loading} = useContext(AuthContext);

    if(loading){
        return <div>loading...</div>;
    }

    if(!user){
        return <Navigate to="/login" replace />;
    }

    if(roleRequired && user?.role !== roleRequired){
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default ProtectedRoute;