import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import supabase from "../supabaseClient";
import "../style/login.css";
import "react-toastify/dist/ReactToastify.css";
import { MdDashboard } from "react-icons/md";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data: user, error: dbError } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();

      if (dbError) {
        throw new Error("User not found");
      }

      if (user && user.password === password) {
        setSuccess("Login successful!");
        toast.success("Login successful!");
        navigate("/");
        setUsername("");
        setPassword("");
      } else {
        setError("Incorrect password");
        toast.error("Please, Check Your Password");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="login_body">
      <div className="login_content">
        <form className="login_form" onSubmit={handleLogin}>
          <h2 className="login_head">Login</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="User Name"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <button className="login_btn" type="submit">
            Login
          </button>
          {error && <p className="login-error">{error}</p>}
        </form>
        <div className="login_img">
          <h3>
            <p>Welcome Back To Our DashBoard</p>
            <MdDashboard className="dashBoard_icon" />
          </h3>
          <p>
            This is a dashboard for an e-commerce platform. You can manage
            products, <br /> user, orders, and customers here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
