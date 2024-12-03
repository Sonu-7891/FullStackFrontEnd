### Folder Structure
    frontend/
│
├── public/         # Static files
├── src/
│   ├── components/ # Reusable components
│   ├── pages/      # Application pages
│   ├── utils/      # Helper functions (e.g., auth)
│   ├── App.jsx     # Main app component
│   └── main.jsx    # Entry point
│
└── package.json    # Project configuration

# Bulk Veggie App - Frontend

The **Bulk Veggie App** frontend is a user-friendly web application for browsing products, placing orders, and tracking them. Admins can also manage inventory and view orders through an intuitive interface.

## Features

### User Features
- **Authentication**: Login and register with role-based access (user/admin).
- **Product Browsing**: View available products with descriptions and prices.
- **Order Placement**: Add items to the cart and place orders.
- **Order Tracking**: View order status and history.

### Admin Features
- **Dashboard**: Access to a dashboard for managing products and viewing all orders.
- **Inventory Management**: Add, update, or delete products.

### General Features
- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **Protected Routes**: Ensures access is role-based and authenticated.

---

## Tech Stack

- **React.js**: Frontend library for building the UI.
- **React Router**: For navigation and routing.
- **Axios**: To make API requests.
- **CSS**: Styling.
- **Vite**: A fast build tool and development server.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your system.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sonu-7891/FullStackFrontEnd.git
   cd frontend
