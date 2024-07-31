import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import Tittle from "../Components/Tittle.jsx";
import Loader from "../Components/Loader";
import "../style/UserEdit.css";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    user_img: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get(`/rest/v1/users?id=eq.${id}`);
        setUserData(data[0]);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        toast.error("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axiosInstance.patch(`/rest/v1/users?id=eq.${id}`, userData);
      toast.success("User updated successfully.");
      navigate("/users");
    } catch (error) {
      console.error("Error updating user data:", error.message);
      toast.error("Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="user-edit-container">
      <Tittle title="Edit User" path="/users" />
      <form className="user-edit-form">
        <label className="user-edit-label">
          First Name:
          <input
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleInputChange}
            className="user-edit-input"
          />
        </label>
        <label className="user-edit-label">
          Last Name:
          <input
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleInputChange}
            className="user-edit-input"
          />
        </label>
        <label className="user-edit-label">
          Username:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            className="user-edit-input"
          />
        </label>
        <label className="user-edit-label">
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="user-edit-input"
          />
        </label>
        <label className="user-edit-label">
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            className="user-edit-input"
          />
        </label>
        <label className="user-edit-label">
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={userData.dateOfBirth}
            onChange={handleInputChange}
            className="user-edit-input"
          />
        </label>
        <label className="user-edit-label">
          User Image:
          <input
            type="text"
            name="user_img"
            value={userData.user_img}
            onChange={handleInputChange}
            className="user-edit-input"
          />
        </label>
        <label className="user-edit-label">
          Status:
          <input
            type="text"
            name="status"
            value={userData.status}
            onChange={handleInputChange}
            className="user-edit-input"
          />
        </label>
        <button onClick={handleSave} className="user-edit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
