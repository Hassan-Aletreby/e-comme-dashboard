import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Loader from "../Components/Loader";
import "../style/profile.css";
import Title from "../Components/Tittle";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/rest/v1/users");
        const data = response.data;
        setUser(data[0]);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <div className="profile-container">
      <Title title="Profile" path="/profile" />
      <div className="profile-image">
        {user.user_img && <img src={`${user.user_img}`} alt="Profile" />}
        <div className="user">
          <p>{user.username}</p>
        </div>
      </div>
      <div className="profile-info">
        <div className="info">
          <label>First Name :</label>
          <p>{user.first_name}</p>
        </div>
        <div className="info">
          <label>Last Name :</label>
          <p>{user.last_name}</p>
        </div>
        <div className="info">
          <label>Email :</label>
          <p>{user.email}</p>
        </div>

        <div className="info">
          <label>Password :</label>
          <p>{user.password}</p>
        </div>
        <div className="info">
          <label>Date of Birth :</label>
          <p>{user.dateOfBirth}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
