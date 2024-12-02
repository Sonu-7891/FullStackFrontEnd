import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api";
import "./OrderForm.css";

const OrderForm = () => {
  const [orderData, setOrderData] = useState({
    name: "",
    contact: "",
    address: "",
    productId: "",
    quantity: 1,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await placeOrder(orderData);
      alert("Order placed successfully!");
      setOrderData({
        name: "",
        contact: "",
        address: "",
        productId: "",
        quantity: 1,
      });
      navigate("/"); // Redirect to homepage or another page after order
    } catch (error) {
      alert(
        error.response?.data?.msg || "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Place an Order</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={orderData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Contact:
        <input
          type="text"
          name="contact"
          value={orderData.contact}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Address:
        <textarea
          name="address"
          value={orderData.address}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Product ID:
        <input
          type="text"
          name="productId"
          value={orderData.productId}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          value={orderData.quantity}
          onChange={handleChange}
          min="1"
          required
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Placing Order..." : "Submit Order"}
      </button>
    </form>
  );
};

export default OrderForm;
