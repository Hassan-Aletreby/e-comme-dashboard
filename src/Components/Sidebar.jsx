import React, { useState, useEffect } from "react";
import "../style/Sidebar.css";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft, FaSearch } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoHome, IoStorefrontSharp, IoStatsChartSharp } from "react-icons/io5";
import ThemeToggleButton from "../Components/ThemeToggleButton";
import { FaUsers } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { FaUsersGear } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { MdAddBusiness } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProductsSubmenuOpen, setIsProductsSubmenuOpen] = useState(false);
  const [isUsersSubmenuOpen, setIsUsersSubmenuOpen] = useState(false);

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

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleProductsHover = () => {
    setIsProductsSubmenuOpen(true);
  };

  const handleProductsMouseLeave = () => {
    setIsProductsSubmenuOpen(false);
  };

  const handleUsersHover = () => {
    setIsUsersSubmenuOpen(true);
  };

  const handleUsersMouseLeave = () => {
    setIsUsersSubmenuOpen(false);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
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
            <li className="link_home" data-tooltip="Home">
              <Link to="/" className="nav_text link">
                <IoHome className="icon" />
                {!isCollapsed && "Home"}
              </Link>
            </li>
            <li
              // data-tooltip="Products"
              onMouseEnter={handleProductsHover}
              onMouseLeave={handleProductsMouseLeave}
              className="products-menu"
            >
              <a href="#" className="link">
                <IoStorefrontSharp className="icon" />
                {!isCollapsed && "Products"}
              </a>
              {isProductsSubmenuOpen && (
                <ul className="sub-menu">
                  <li>
                    <Link to="/products">
                      <TbCategoryFilled className="icon1" />
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/create">
                      <MdAddBusiness className="icon1" />
                      Add Product
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              // data-tooltip="Users Manage"
              onMouseEnter={handleUsersHover}
              onMouseLeave={handleUsersMouseLeave}
              className="users-menu"
            >
              <a href="#" className="link">
                <FaUsersGear className="icon" />
                {!isCollapsed && "Users Manage"}
              </a>
              {isUsersSubmenuOpen && (
                <ul className="sub-menu">
                  <li>
                    <Link to="/users">
                      <FaUsers className="icon1" /> All Users
                    </Link>
                  </li>
                  <li>
                    <Link to="/users/add">
                      <FaUserPlus className="icon1" /> Add New User
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li data-tooltip="Charts">
              <Link to="/products/charts" className="link">
                <IoStatsChartSharp className="icon" />
                {!isCollapsed && "Chart Page"}
              </Link>
            </li>
            <li data-tooltip="Log Out">
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
  );
};

export default Sidebar;
