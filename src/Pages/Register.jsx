import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import "../style/register.css";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error: dbError } = await supabase
      .from("users")
      .insert([
        { username, email, password, first_name, last_name, dateOfBirth },
      ]);

    if (dbError) {
      setError("Registration failed");
      toast.error("Registration failed");
      return;
    }

    setSuccess("Registration successful!");
    setusername("");
    setemail("");
    setpassword("");
    setfirst_name("");
    setlast_name("");
    setdateOfBirth("");
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form className="register_form" onSubmit={handleRegister}>
        <label>
          First Name:
          <input
            type="text"
            value={first_name}
            onChange={(e) => setfirst_name(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={last_name}
            onChange={(e) => setlast_name(e.target.value)}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setdateOfBirth(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
        <button
          onClick={() => navigate("/login")}
          className="login-redirect-button"
        >
          Already have an account? Login
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Register;
