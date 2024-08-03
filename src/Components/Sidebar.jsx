import React, { useState, useEffect } from "react";
import "../style/Sidebar.css";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft, FaSearch, FaBars } from "react-icons/fa";
import { MdDashboard, MdAddBusiness, MdBorderColor } from "react-icons/md";
import { IoHome, IoStorefrontSharp, IoStatsChartSharp } from "react-icons/io5";
import ThemeToggleButton from "../Components/ThemeToggleButton";
import { LuLogOut } from "react-icons/lu";
import { FaUsersGear, FaUserPlus } from "react-icons/fa6";

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed
  const [activeItem, setActiveItem] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Default to hidden

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const moonIcon = document.querySelector(".moon");
    const sunIcon = document.querySelector(".sun");

    if (moonIcon && sunIcon) {
      moonIcon.classList.toggle("apper", !isDarkMode);
      sunIcon.classList.toggle("apper", isDarkMode);
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const toggleSidebarVisibility = () => setIsSidebarVisible((prev) => !prev);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <div
        className={`sidebar ${isCollapsed ? "collapsed" : ""} ${
          isSidebarVisible ? "visible" : "hidden"
        }`}
      >
        <div className="sidebar_header">
          <Link to="/" className="link">
            <MdDashboard className="dashBoard_icon" />
          </Link>
          {!isCollapsed && <h5>Dashboard</h5>}
        </div>
        <div className="menu_bar">
          <div className="light_dark_icon">
            <ThemeToggleButton />
          </div>
          <div className="menu">
            <ul className="menu_links">
              {!isCollapsed && (
                <li className="side_search">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="search_input"
                  />
                  <FaSearch className="search_icon icon" />
                </li>
              )}
              <li
                data-tooltip="Home"
                className={`menu_item ${activeItem === "home" ? "active" : ""}`}
                onClick={() => handleItemClick("home")}
              >
                <Link to="/" className="nav_text link">
                  <IoHome className="icon" />
                  {!isCollapsed && "Home"}
                </Link>
              </li>
              <li
                data-tooltip="Products"
                className={`menu_item ${
                  activeItem === "products" ? "active" : ""
                }`}
                onClick={() => handleItemClick("products")}
              >
                <Link to="/products" className="link">
                  <IoStorefrontSharp className="icon" />
                  {!isCollapsed && "Products"}
                </Link>
              </li>

              <li
                data-tooltip="Add Product"
                className={`menu_item ${
                  activeItem === "addProduct" ? "active" : ""
                }`}
                onClick={() => handleItemClick("addProduct")}
              >
                <Link to="/products/create" className="link">
                  <MdAddBusiness className="icon" />
                  {!isCollapsed && " Add Product"}
                </Link>
              </li>
              <li
                data-tooltip="Users"
                className={`menu_item ${
                  activeItem === "usersManage" ? "active" : ""
                }`}
                onClick={() => handleItemClick("usersManage")}
              >
                <Link to="/users" className="link">
                  <FaUsersGear className="icon" />
                  {!isCollapsed && "Users Manage"}
                </Link>
              </li>
              <li
                data-tooltip="Add User"
                className={`menu_item ${
                  activeItem === "addUser" ? "active" : ""
                }`}
                onClick={() => handleItemClick("addUser")}
              >
                <Link to="/users/add" className="link">
                  <FaUserPlus className="icon" />
                  {!isCollapsed && " Add New User"}
                </Link>
              </li>
              <li
                data-tooltip="Charts"
                className={`menu_item ${
                  activeItem === "charts" ? "active" : ""
                }`}
                onClick={() => handleItemClick("charts")}
              >
                <Link to="/products/charts" className="link">
                  <IoStatsChartSharp className="icon" />
                  {!isCollapsed && "Chart Page"}
                </Link>
              </li>
              <li
                data-tooltip="Orders"
                className={`menu_item ${
                  activeItem === "orders" ? "active" : ""
                }`}
                onClick={() => handleItemClick("orders")}
              >
                <Link to="/orders" className="link">
                  <MdBorderColor className="icon" />
                  {!isCollapsed && "Orders Page"}
                </Link>
              </li>
              <li
                data-tooltip="Log Out"
                className={`menu_item ${
                  activeItem === "logout" ? "active" : ""
                }`}
                onClick={() => handleItemClick("logout")}
              >
                <Link to="/login" className="link">
                  <LuLogOut className="icon" />
                  {!isCollapsed && "Log Out"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebar_toggle">
          <div className="toggle" onClick={toggleSidebar}>
            {isCollapsed ? (
              <FaArrowRight className="arrow" />
            ) : (
              <FaArrowLeft className="arrow" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
