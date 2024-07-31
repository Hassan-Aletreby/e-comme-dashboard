import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import "../style/style.css";

function RootLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="root-layout">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <Header />
        <div className="main_container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout;
