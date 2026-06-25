import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import PageLoader from "../../components/Common/PageLoader";

function ProfileCard(){
    const {user} = useContext(AuthContext);
    
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    
    const token = localStorage.getItem("token");

    const handleUpdate = async(e) => {
        e.preventDefault();
        
        try{
            const res = await axios.put("http://localhost:5000/api/profile", {name, email}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        
        alert(res.data.message);
    
    }catch(err){
        console.log(err);
        alert(err.response?.data?.message || "Profile update failed");
    }
};

return(
<div className = "profile-card">
    <h2>My Profile</h2>
    <div className = "profile-image-section">
        <img src = {user?.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="profile" className="profile-image"/>
    </div>
    
    <form onSubmit = {handleUpdate}>
        <div className = "form-group">
            <label>Name</label>
            <input type = "text" value = {name} onChange = {(e) => setName(e.target.value)} />
        </div>
        
        <div className = "form-group">
            <label>Email</label>
            <input type = "email" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
        </div>
        
        <button type = "submit">
            Update Profile
        </button>
    </form>
    </div>
    );
}

export default ProfileCard;