import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { fetchOrders } from "../api";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";
import "./AdminDashboard.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated() || getUserRole() !== "admin") {
      navigate("/login");
    } else {
      loadOrders();
    }
  }, [navigate]);

  const loadOrders = async () => {
    const data = await fetchOrders();
    setOrders(data);

    const counts = data.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    setStatusCounts(counts);
  };

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Order Status Count",
        data: Object.values(statusCounts),
        backgroundColor: ["#4caf50", "#ffa726", "#2196f3"],
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="chart-container">
        <Bar data={chartData} />
      </div>
      <h2>Orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order._id}>
            <strong>Order ID:</strong> {order._id}, <strong>Status:</strong>{" "}
            {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
