import React, { useState, useEffect } from "react";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

import "../style/light&dark_icon.css";
const ThemeToggleButton = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      {theme === "light" ? (
        <FaRegMoon className="FaRegMoon" />
      ) : (
        <FiSun className="FaRegSun" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
