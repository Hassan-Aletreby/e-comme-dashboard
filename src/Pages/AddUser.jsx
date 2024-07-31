import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import Tittle from "../Components/Tittle.jsx";
import Loader from "../Components/Loader";
import "../style/AddUser.css";

const UserAdd = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    user_img: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      setLoading(true);
      await axiosInstance.post("/rest/v1/users", newUser);
      toast.success("User added successfully.");
      navigate("/users");
    } catch (error) {
      console.error("Error adding user:", error.message);
      toast.error("Failed to add user.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (
      !newUser.first_name ||
      !newUser.username ||
      !newUser.email ||
      !newUser.password
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    handleAddUser(); // Proceed with adding the user
  };

  if (loading) return <Loader />;

  return (
    <div className="user-add-container">
      <Tittle title="Add New User" path="/users" />
      <form onSubmit={handleSubmit} className="user-add-form">
        <label className="user-add-label">
          First Name:
          <input
            type="text"
            name="first_name"
            value={newUser.first_name}
            onChange={handleInputChange}
            className="user-add-input"
            required
          />
        </label>
        <label className="user-add-label">
          Last Name:
          <input
            type="text"
            name="last_name"
            value={newUser.last_name}
            onChange={handleInputChange}
            className="user-add-input"
          />
        </label>
        <label className="user-add-label">
          Username:
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            className="user-add-input"
            required
          />
        </label>
        <label className="user-add-label">
          Email:
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            className="user-add-input"
            required
          />
        </label>
        <label className="user-add-label">
          Password:
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            className="user-add-input"
            required
          />
        </label>
        <label className="user-add-label">
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={newUser.dateOfBirth}
            onChange={handleInputChange}
            className="user-add-input"
          />
        </label>
        <label className="user-add-label">
          User Image:
          <input
            type="text"
            name="user_img"
            value={newUser.user_img}
            onChange={handleInputChange}
            className="user-add-input"
          />
        </label>
        <label className="user-add-label">
          Status:
          <input
            type="text"
            name="status"
            value={newUser.status}
            onChange={handleInputChange}
            className="user-add-input"
          />
        </label>
        <button type="submit" className="user-add-button">
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserAdd;
