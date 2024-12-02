import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Bulk Veggie App</h2>
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
            <li>
              <Link to="/track-order">Track Order</Link>
            </li>
            <li>
              <Link to="/admin-dashboard">Admin Dashboard</Link>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <p>Contact Us</p>
          <a href="mailto:support@bulkveggieapp.com">
            support@bulkveggieapp.com
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Bulk Veggie App. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
