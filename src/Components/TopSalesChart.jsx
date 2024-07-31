"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import supabase from "../supabaseClient";
import Loader from "../Components/Loader";
import "../style/charts.css";

const TopSalesChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSalesData = async () => {
      setLoading(true);
      try {
        const { data: products, error } = await supabase
          .from("products")
          .select("title, sales")
          .order("sales", { ascending: true })
          .limit(35);

        if (error) throw error;

        const formattedData = products.map((product) => ({
          name: product.title,
          sales: product.sales || 0,
        }));

        setData(formattedData);
      } catch (error) {
        setError("Failed to load top sales data.");
        console.error("Error fetching top sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSalesData();
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
        <h2>Top Sales Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart_description">
        <p>
          This bar chart visualizes the top-selling products based on sales
          data. The chart fetches data from the "products" table in Supabase and
          displays the top 25 products ranked by their sales figures.
        </p>
        <ul>
          <li>
            <strong>X-axis:</strong> Displays the names of the products.
          </li>
          <li>
            <strong>Y-axis:</strong> Shows the sales figures for each product.
          </li>
          <li>
            <strong>Bar Color:</strong> The bars are colored in green to
            represent sales data.
          </li>
        </ul>
        <p>
          Data is retrieved from the "products" table, sorted in descending
          order of sales. This chart helps to quickly identify which products
          are performing the best in terms of sales.
        </p>
      </div>
    </div>
  );
};

export default TopSalesChart;
