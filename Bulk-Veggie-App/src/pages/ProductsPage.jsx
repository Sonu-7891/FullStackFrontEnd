import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import "./ProductsPage.css";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      // console.log(data)
      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
