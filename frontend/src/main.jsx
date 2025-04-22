import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' in React 18
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter here
import "./index.css"; // Import your CSS file

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root element

root.render(
  <Router> {/* Wrap the App in Router here */}
    <App />
  </Router>
);