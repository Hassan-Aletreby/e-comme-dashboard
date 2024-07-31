import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";
import Login from "./Pages/Login";
import RootLayout from "./Components/RootLayout";
import RoutesApp from "./router/Routes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return <RoutesApp />;
  // <Router>
  //   <Routes>
  //     <Route
  //       path="/login"
  //       element={
  //         isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
  //       }
  //     />
  //     <Route path="/" element={<RootLayout />} />
  //   </Routes>
  // </Router>
}

export default App;
