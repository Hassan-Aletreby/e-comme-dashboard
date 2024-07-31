import React from "react";
import ProductChart from "../Components/ProductsPriceChart";
import TopSalesChart from "../Components/TopSalesChart";
import Tittle from "../Components/Tittle";
import "../style/charts.css";

const ProductChartPage = () => {
  return (
    <div>
      <Tittle title="Products Charts" path="/products/charts" />
      <div className="chart">
        <ProductChart />
        <TopSalesChart />
      </div>
    </div>
  );
};

export default ProductChartPage;
