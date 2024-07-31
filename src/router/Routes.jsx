import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "../Components/RootLayout";
import ProductsLayout from "../Components/ProductsLayout";
import AddProducts from "../Pages/AddProducts";
import UpdateProducts from "../Pages/UpdateProducts";
import OurProducts from "../Pages/OurProducts";
import Home from "../Pages/Home";
import ProductDetails from "../Pages/ProductDetails";
import ProductChartPage from "../Pages/Charts";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import UserList from "../Pages/UsersManage";
import UserEdit from "../Pages/UserEdit";
import UserAdd from "../Pages/AddUser";

function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<ProductsLayout />}>
            <Route index element={<OurProducts />} />
            <Route path="create" element={<AddProducts />} />
            <Route path="details/:id" element={<ProductDetails />} />
            <Route path="update/:id" element={<UpdateProducts />} />
            <Route path="charts" element={<ProductChartPage />} />
          </Route>
          <Route path="users" element={<UserList />} />
          <Route path="users/edit/:id" element={<UserEdit />} />
          <Route path="users/add" element={<UserAdd />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Router>
  );
}

export default RoutesApp;
