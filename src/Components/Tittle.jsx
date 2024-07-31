import React from "react";
import { Link } from "react-router-dom";
import "../style/Tittle.css";
const Tittle = ({ title, path }) => {
  return (
    <header>
      <h1>{title}</h1>

      <p>
        <Link to={path}>{path}</Link>
      </p>
    </header>
  );
};

export default Tittle;
