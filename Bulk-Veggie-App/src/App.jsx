// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import ProductsPage from "./pages/ProductsPage";
// import TrackOrderPage from "./pages/TrackOrderPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminInventory from "./pages/AdminInventory";
// import OrderForm from "./components/OrderForm";
// import LoginRegisterPage from "./pages/LoginRegisterPage";
// import Footer from "./components/Footer";
// import { isAuthenticated, isNewUser } from "./utils/auth";

// const ProtectedRoute = ({ role, children }) => {
//   const userRole = getUserRole();
//   if (!isAuthenticated() || (role && role !== userRole)) {
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<ProductsPage />} />
//         <Route
//           path="/login"
//           element={
//             isNewUser() ? <Navigate to="/register" /> : <LoginRegisterPage />
//           }
//         />
//         <Route path="/register" element={<LoginRegisterPage />} />

//         {/* Protected Routes */}
//         <Route
//           path="/order"
//           element={isAuthenticated() ? <OrderForm /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/orders"
//           element={isAuthenticated() ? <OrderForm /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/track-order"
//           element={
//             isAuthenticated() ? <TrackOrderPage /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/admin-dashboard"
//           element={
//             isAuthenticated() ? <AdminDashboard /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/admin-inventory"
//           element={
//             isAuthenticated() ? <AdminInventory /> : <Navigate to="/login" />
//           }
//         />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// };

// export default App;
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminInventory from "./pages/AdminInventory";
import OrderForm from "./components/OrderForm";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import Footer from "./components/Footer";
import { isAuthenticated, getUserRole, isNewUser } from "./utils/auth";

const ProtectedRoute = ({ role, children }) => {
  const userRole = getUserRole();
  if (!isAuthenticated() || (role && role !== userRole)) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<ProductsPage />} />
        <Route
          path="/login"
          element={
            isNewUser() ? <Navigate to="/register" /> : <LoginRegisterPage />
          }
        />
        <Route path="/register" element={<LoginRegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/order"
          element={isAuthenticated() ? <OrderForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={isAuthenticated() ? <OrderForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/track-order"
          element={
            isAuthenticated() ? <TrackOrderPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-inventory"
          element={
            <ProtectedRoute role="admin">
              <AdminInventory />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
