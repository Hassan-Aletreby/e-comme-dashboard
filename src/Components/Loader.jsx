import React from "react";
import "../style/Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loading_text">Loading...</p>
    </div>
  );
};

export default Loader;
