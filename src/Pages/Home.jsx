import React from "react";
import "../style/Home.css";
import Tittle from "../Components/Tittle.jsx";

function Home() {
  return (
    <div>
      <Tittle title="Home Page" path="/Home" />
      <div className="home_content">
        <h1>Welcome to the E-Commerce Dashboard</h1>
        <p>
          This is a dashboard for an e-commerce platform. You can manage
          products, orders, and customers here.
        </p>
        <p>Please use the navigation menu to navigate to different sections.</p>
        <p>Enjoy your dashboard experience!</p>
      </div>
    </div>
  );
}

export default Home;
