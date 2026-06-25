import React from "react";

import {useState} from "react";

import {registerApi} from "../../api/authApi";

import {useNavigate, Link} from "react-router-dom";

function Register(){
    const [form,setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "Employee"
    });
    
    const [loading,setLoading] = useState(false);
    
    const navigate = useNavigate();
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if(!form.name || !form.email || !form.password){
            alert("Please fill all fields");
            return;
        }
        
        setLoading(true);
        
        try{
            await registerApi(form);
            alert("Registration successful");
            navigate("/login");
        }
        catch(err){
            console.log(err);
            alert("Registration failed");
        }
        finally{
            setLoading(false);
        }
    };
    
    return(
    <div className = "auth-page">
        <div className = "auth-card">
            <h1>Create Account 🚀</h1>
            <p>Register to access the portal</p>
            <form onSubmit = {handleSubmit}>
                <input type = "text" placeholder = "Full Name" value = {form.name} onChange = {(e)=> setForm({
                    ...form, name:e.target.value
                })}/>
                
                <input type = "email" placeholder = "Email" value = {form.email} onChange = {(e)=> setForm({
                    ...form, email:e.target.value
                })}/>
                
                <input type = "password" placeholder = "Password" value = {form.password} onChange = {(e)=> setForm({
                    ...form, password:e.target.value
                })}/>
                
                <select value = {form.role} onChange = {(e)=> setForm({
                    ...form, role:e.target.value
                })}>
                    
                    <option value = "Employee">Employee</option>
                    
                    <option value = "HR">HR</option>
                    
                </select>
                
                <button type = "submit" disabled = {loading}>
                    
                    {loading ? "Registering..." : "Register"}
                    
                </button>
                
            <div className = "auth-footer">
                Already have an account?
                <Link to = "/login">Login</Link>
            </div>
        </form>
    </div>
</div>
);
}

export default Register;