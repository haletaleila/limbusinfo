import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Router"; // Import AppRouter

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<AppRouter />);
