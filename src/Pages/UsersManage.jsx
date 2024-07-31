import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import Tittle from "../Components/Tittle.jsx";
import "../style/usermanage.css";
import Loader from "../Components/Loader";
import ConfirmationModal from "../Components/ConfirmationModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionType, setActionType] = useState("");
  const [userToProcess, setUserToProcess] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/rest/v1/users");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = (userId) => {
    setUserToProcess(userId);
    setActionType("delete");
    setShowConfirmation(true);
  };

  const confirmAction = async () => {
    setShowConfirmation(false);
    try {
      setLoading(true);
      if (actionType === "delete" && userToProcess) {
        await axiosInstance.delete(`/rest/v1/users`, {
          params: {
            id: `eq.${userToProcess}`,
          },
        });
        toast.success("User deleted successfully.");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error performing action:", error.message);
      toast.error("Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  const cancelAction = () => {
    setShowConfirmation(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="user-list-container">
      <Tittle title="Users Management" path="/users" />
      {/* <Link to="/users/add" className="add-user-btn">
        Add New User
      </Link> */}
      <table className="user-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Date of Birth</th>
            <th>User Image</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.dateOfBirth}</td>
              <td>
                {user.user_img ? (
                  <img
                    src={user.user_img}
                    alt="User"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                ) : null}
              </td>
              <td>
                {user.status === "online" ? (
                  <span className="status online">Online</span>
                ) : (
                  <span className="status offline">Offline</span>
                )}
              </td>
              <td>
                <div className="btns">
                  <Link to={`/users/edit/${user.id}`} className="user_btn">
                    Edit
                  </Link>
                  <button
                    className="user_btn"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this user?"
          onConfirm={confirmAction}
          onCancel={cancelAction}
        />
      )}
    </div>
  );
};

export default UserList;
