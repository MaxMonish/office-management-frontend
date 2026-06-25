import React, {useEffect, useState} from "react";
import MainLayout from "../../components/Layout/MainLayout";
import axiosInstance from "../../api/axiosConfig";
import PageLoader from "../../components/Common/PageLoader";

function ProfilePage(){
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const [image, setImage] = useState(null);
  
  const fetchProfile = async() => {
    try{
      setLoading(true);
      const res = await axiosInstance.get("/profile/me");
      setProfile(res.data);
      setFormData({
        name: res.data.name || "",
        email: res.data.email || ""
      });
    }catch(err){
      console.error("Profile fetch error:", err);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async(e) => {
    e.preventDefault();
    try{
      const res = await axiosInstance.put("/profile", formData);
      alert(res.data.message);
      fetchProfile();
    }catch(err){
      alert(err.response?.data?.message || "Profile update failed");
    }
  };

  const changePassword = async(e) => {
    e.preventDefault();
    try{
      const res = await axiosInstance.put("/profile/change-password", passwordData);
      alert(res.data.message);
      setPasswordData({
        oldPassword: "",
        newPassword: ""
      });
    }catch(err){
      alert(err.response?.data?.message || "Password change failed");
    }
  };

  const uploadImage = async() => {
    if (!image) return;
    const data = new FormData();
    data.append("image", image);
    try{
      const res = await axiosInstance.put("/profile/profile-image", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert(res.data.message);
      fetchProfile();
    }catch(err){
      alert(err.response?.data?.message || "Image upload failed");
    }
  };

  if(loading){
    return(
    <MainLayout>
      <PageLoader />
    </MainLayout>
    );
  }

  if(!profile){
    return(
    <MainLayout>
      <h2>Profile not found</h2>
    </MainLayout>
    );
  }

  return(
  <MainLayout>
    <h1>My Profile</h1>
    <div className = "profile-card">
      <img src = {profile.profileImage || "https://via.placeholder.com/150"} alt = "profile" className = "profile-image"/>
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
      <p>Role: {profile.role}</p>
      <p>Last Seen:{" "}
        {profile.lastSeen ? new Date(profile.lastSeen).toLocaleString() : "Online"}</p>
    </div>
    
    <div className = "form-card">
      <h3>Edit Profile</h3>
      <form onSubmit = {updateProfile}>
        <input type = "text" placeholder = "Name" value = {formData.name} onChange = {(e) => setFormData({ ...formData, name: e.target.value })}/>
        <input type = "email" placeholder = "Email" value = {formData.email} onChange = {(e) => setFormData({ ...formData, email: e.target.value })}/>
        <button type = "submit">Update Profile</button>
      </form>
    </div>
    
    <div className = "form-card">
      <h3>Change Password</h3>
        <form onSubmit = {changePassword}>
          <input type = "password" placeholder = "Old Password" value = {passwordData.oldPassword} onChange = {(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}/>
          <input type = "password" placeholder = "New Password" value = {passwordData.newPassword} onChange = {(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}/>
          <button type = "submit">Change Password</button>
        </form>
    </div>
    
    <div className = "form-card">
      <h3>Upload Profile Image</h3>
      <input type = "file" onChange = {(e) => setImage(e.target.files[0])}/>
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  </MainLayout>
  );
}

export default ProfilePage;