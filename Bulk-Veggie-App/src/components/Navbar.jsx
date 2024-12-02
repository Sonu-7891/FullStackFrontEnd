import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated,getUserRole, logout } from "../utils/auth";
import "./Navbar.css";


const Navbar = () => {
  const role = getUserRole();
  const [isMenuOpen, setIsMenuOpen] = useState(true); // State to manage menu visibility
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Toggle menu visibility

  const handleProtectedRoute = (path) => {
    if (isAuthenticated()) {
      setIsMenuOpen(false); // Close the menu on navigation
      navigate(path);
    } else {
      alert("Please log in to access this page.");
      setIsMenuOpen(false); // Close the menu
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false); // Close the menu
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-header" onClick={() => navigate("/")}>
        <h1>Bulk Veggie App</h1>
      </div>

      <button className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? "☰" : "✖"}
      </button>

      <ul className={`nav-links ${isMenuOpen ? "show-menu" : ""}`}>
        <li onClick={() => setIsMenuOpen(false)}>
          <Link to="/">Products</Link>
        </li>
        <li>
          <button
            className="nav-button"
            onClick={() => handleProtectedRoute("/order")}
          >
            Order
          </button>
        </li>
        <li>
          <button
            className="nav-button"
            onClick={() => handleProtectedRoute("/track-order")}
          >
            Track Order
          </button>
        </li>
        {role === "admin" && (
          <>
            <li>
              <button
                className="nav-button"
                onClick={() => handleProtectedRoute("/admin-dashboard")}
              >
                Admin Dashboard
              </button>
            </li>
            <li>
              <button
                className="nav-button"
                onClick={() => handleProtectedRoute("/admin-inventory")}
              >
                Admin Inventory
              </button>
            </li>
          </>
        )}
        {isAuthenticated() ? (
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
// onClick={() => setIsMenuOpen(false)}
export default Navbar;
