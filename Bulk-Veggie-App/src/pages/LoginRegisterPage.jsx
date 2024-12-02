import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./LoginRegisterPage.css";
import { getUserRole } from "../utils/auth";

const LoginRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); // Default role set to 'user'
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
  //     console.log(endpoint)
  //     const { data } = await axios.post(endpoint, { email, password ,role });
  //     if (!data.token) {
  //       throw new Error("No token received from the server.");
  //     } 
  //     localStorage.setItem("token", data.token);

  //     alert(isLogin ? "Login successful!" : "Registration successful!");

  //     // Redirect based on role
  //     const role = getUserRole();
  //     if (role === "admin") {
  //       navigate("/admin-dashboard");
  //     } else {
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     alert(error.response?.data?.msg || "An error occurred.");
  //   }
  //   setEmail("");
  //   setPassword("");
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    // console.log(`Making request to: ${endpoint}`);

    // Make the request
    const { data } = await axios.post(endpoint, { email, password, role });

    // Handle login flow
    if (isLogin) {
      if (!data.token) {
        throw new Error("No token received from the server.");
      }

      // Save token in localStorage
      localStorage.setItem("token", data.token);
      alert("Login successful!");

      // Redirect based on role
      const userRole = getUserRole();
      if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    }
    // Handle registration flow
    else {
      alert("Registration successful! Please log in.");
      navigate("/login");
    }
  } catch (error) {
    console.error("Error:", error);
    alert(error.response?.data?.msg || "An error occurred.");
  }

  // Reset form fields
  setEmail("");
  setPassword("");
};

  return (
    <div className="login-card">
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span onClick={togglePasswordVisibility}>
          {showPassword ? "👁️" : "🙈"}
        </span>
        {/* {!isLogin && ( */}
        <select
          className="login-card-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          {/* <option value="/">Select one </option> */}
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {/* )} */}
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <p>
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <span className="auth-link" onClick={() => navigate("/register")}>
              Register
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span className="auth-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default LoginRegisterPage;
