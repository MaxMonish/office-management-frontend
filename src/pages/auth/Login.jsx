import React from "react";

import {useState, useContext} from "react";

import {loginApi} from "../../api/authApi";

import {AuthContext} from "../../context/AuthContext";

import {useNavigate, Link} from "react-router-dom";

function Login(){
    const [form,setForm] = useState({
        email: "",
        password: ""
    });
    
    const [loading,setLoading] = useState(false);
    
    const {login} = useContext(AuthContext);
    
    const navigate = useNavigate();
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!form.email || !form.password){
            alert("Please fill all fields");
            return;
        }
        
    setLoading(true);
    
    try{
        const data = await loginApi(form);
        console.log("Login Response: ", data);
        const user = data.user;
        
        localStorage.setItem(
            "token", data.user.token
        );
        
        localStorage.setItem(
            "user", JSON.stringify(user)
        );
        
        login(user);
        
        if(user.role === "HR"){
            navigate("/hr/dashboard");
        }
        
        else if(user.role === "Employee"){
            navigate("/employee/dashboard");
        }
        
        else{
            alert("Invalid role");
        }
    }
    
    catch(err){
        console.log(err);
        alert("Invalid email or password");
    }
    
    finally{
        setLoading(false);
    }
};

return(
<div className = "auth-page">
    <div className = "auth-card">
        <h1>Welcome Back 👋</h1>
        <p>Login to continue</p>
        <form onSubmit = {handleSubmit}>
            <input type = "email" placeholder = "Email" value = {form.email} onChange = {(e)=> setForm({
                ...form, email: e.target.value
            })}/>
            
            <input type = "password" placeholder = "Password" value = {form.password} onChange={(e)=> setForm({ ...form, password:e.target.value})}/>
            
            <button type = "submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            
            <div className = "auth-footer">Don't have an account?<Link to = "/register">
            Register
            </Link>
            </div>
        </form>
    </div>
</div>
);
}

export default Login;