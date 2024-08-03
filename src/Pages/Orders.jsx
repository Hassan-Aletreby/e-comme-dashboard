import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import Loader from "../Components/Loader";
import ConfirmationModal from "../Components/ConfirmationModal";
import Tittle from "../Components/Tittle.jsx";
import "../style/orders.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/rest/v1/orders");
      const ordersWithData = data.map((order) => ({
        ...order,
      }));
      setOrders(ordersWithData);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (products) => {
    return products.reduce((total, product) => {
      return total + product.unit_price * product.quantity;
    }, 0);
  };

  const handleDeleteOrder = (orderId) => {
    setOrderToDelete(orderId);
    setShowConfirmation(true);
  };

  const confirmDeleteOrder = async () => {
    setShowConfirmation(false);
    try {
      setLoading(true);
      await axiosInstance.delete(`/rest/v1/orders`, {
        params: {
          id: `eq.${orderToDelete}`,
        },
      });
      toast.success("Order deleted successfully.");
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error.message);
      toast.error("Failed to delete order.");
    } finally {
      setLoading(false);
    }
  };

  const cancelDeleteOrder = () => {
    setShowConfirmation(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "New":
        return "order-status-new";
      case "Preparing":
        return "order-status-preparing";
      case "Completed":
        return "order-status-completed";
      case "Cancelled":
        return "order-status-cancelled";
      default:
        return "";
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="order-list-container">
      <Tittle title="Orders List" path="/orders" />
      <table className="order-list-table">
        <thead className="order-list-thead">
          <tr>
            <th className="order-list-th">ID</th>
            <th className="order-list-th">Customer Name</th>
            <th className="order-list-th">Order Date</th>
            <th className="order-list-th">Products</th>
            <th className="order-list-th">Total Amount</th>
            <th className="order-list-th">Status</th>
            <th className="order-list-th">Actions</th>
          </tr>
        </thead>
        <tbody className="order-list-tbody">
          {orders.map((order) => (
            <tr key={order.id} className="order-list-tr">
              <td data-label="ID" className="order-list-td">
                {order.id}
              </td>
              <td data-label="Customer Name" className="order-list-td">
                {order.customer_name}
              </td>
              <td data-label="Date" className="order-list-td">
                {order.created_at}
              </td>
              <td data-label="Product" className="order-list-td">
                <ul className="order-products-list">
                  {order.products.map((product, index) => (
                    <li key={index} className="order-product-item">
                      {product.name}{" "}
                      <span className="quantity">({product.quantity})</span>- $
                      <span className="unite_price">
                        {product.unit_price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </td>
              <td data-label="Price" className="order-list-td">
                ${calculateTotal(order.products).toFixed(2)}
              </td>
              <td
                data-label="Status"
                className={`order-list-td ${getStatusClass(order.status)}`}
              >
                {order.status}
              </td>
              <td data-label="Actions" className="order-list-td">
                <div className="order-actions">
                  <button
                    className="order-btn order-cancel-btn"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this order?"
          onConfirm={confirmDeleteOrder}
          onCancel={cancelDeleteOrder}
        />
      )}
    </div>
  );
};

export default OrderList;
