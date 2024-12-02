import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../api";
import "./AdminInventory.css";
import { isAuthenticated, getUserRole } from "../utils/auth";

const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated() || getUserRole() !== "admin") {
      navigate("/login");
    } else {
      loadProducts();
    }
  }, [navigate]);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      alert("Product deleted!");
      loadProducts();
    } catch (error) {
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="admin-inventory">
      <h1>Admin Inventory</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id}>
            <img
              className="product-list-img"
              src={product.image}
              alt={product.name}
            />
            <div>
              <p>
                <strong>{product.name}</strong>
              </p>
              <p>Price: ${product.pricePerUnit.toFixed(2)}</p>
            </div>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminInventory;
