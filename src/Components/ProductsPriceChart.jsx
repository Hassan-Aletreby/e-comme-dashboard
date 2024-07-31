"use client";
import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import supabase from "../supabaseClient";
import Loader from "./Loader";
import "../style/charts.css";

const ProductChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        // You can modify the query as needed
        const { data: products, error } = await supabase
          .from("products")
          .select("title, price"); // Select the fields you need

        if (error) throw error;

        // Format the data for the area chart
        const formattedData = products.map((product) => ({
          name: product.title,
          price: product.price || 0,
        }));

        setData(formattedData);
      } catch (error) {
        setError("Failed to load chart data.");
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="chart_wrapper">
      <div className="chart_container">
        <h2>Products Price Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="chart_description">
        <p>
          This interactive chart displays the prices of various products from
          the database. Data is fetched from the "products" table in Supabase,
          and the chart shows product prices on the Y-axis and product names on
          the X-axis.
        </p>
        <ul>
          <li>
            <strong>X-axis:</strong> Shows the names of the products.
          </li>
          <li>
            <strong>Y-axis:</strong> Displays the prices of the products.
          </li>
          <li>
            <strong>Color:</strong> The purple area represents the price data.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductChart;
