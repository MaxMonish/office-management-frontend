import React, {useState} from "react";
import axios from "axios";
import PageLoader from "../../components/Common/PageLoader";

function ChangePassword(){
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const token = localStorage.getItem("token");

    const handlePasswordChange = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.put("http://localhost:5000/api/profile/change-password", {oldPassword, newPassword}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            alert(res.data.message);

            setOldPassword("");
            setNewPassword("");
        
        }catch(err){
            console.log(err);
            
            alert(err.response?.data?.message || "Password change failed");
        }
    };

    return(
    <div className = "profile-card">
        <h2>Change Password</h2>
        <form onSubmit = {handlePasswordChange}>
            <div className = "form-group">
                <label>Old Password</label>
                <input type = "password" value = {oldPassword} onChange = {(e) => setOldPassword(e.target.value)}/>
            </div>
            
            <div className = "form-group">
                <label>New Password</label>
                <input type = "password"
                    value = {newPassword}
                    onChange = {(e) =>
                        setNewPassword(e.target.value)
                    }
                />
                
            </div>
            
            <button type = "submit">
                Change Password
            </button>
        </form>
    </div>
    );
}

export default ChangePassword;