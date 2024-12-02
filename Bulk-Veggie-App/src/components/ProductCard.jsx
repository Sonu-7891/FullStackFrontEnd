import React from "react";
import "./ProductCard.css"
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleOrder = () => {
    if (!isAuthenticated()) {
      alert("Please login or register first.");
      navigate("/login");
    } else {
      // Add order logic here (e.g., open an order form)
      console.log(`Ordering ${product.name}`);
    }
  };

  return (
    <div className="product-card">
      <img className="product-card-img" src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.pricePerUnit} per unit</p>
      <button className="order-button" onClick={handleOrder}>
        Order Now
      </button>
    </div>
  );
};

export default ProductCard;
