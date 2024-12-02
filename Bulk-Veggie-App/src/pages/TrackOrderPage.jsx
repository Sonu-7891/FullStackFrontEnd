import React, { useState } from "react";
import { fetchOrders } from "../api";
import "./TrackOrderPage.css";

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);

  const handleTrackOrder = async () => {
    try {
      const orders = await fetchOrders();
      console.log(orders)
      const foundOrder = orders.find((o) => o._id === orderId);
      setOrder(foundOrder);
      if (!foundOrder) {
        alert("Order not found!");
      }
    } catch (error) {
      alert("Failed to fetch orders. Please try again.");
    }
  };

  return (
    <div className="track-order">
      <h1>Track Your Order</h1>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={handleTrackOrder}>Track</button>

      {order && (
        <div className="order-details">
          <h3>Order Details</h3>
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Product:</strong> {order.productName}
          </p>
          <p>
            <strong>Quantity:</strong> {order.quantity}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
