import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";
import { ThemeContextProvider } from "@/context/ThemeContext";
import "@/index.css";

const root = document.getElementById("root");

if (!root) {
    throw new Error("Root element not found.");
}

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <ThemeContextProvider>
            <App />
        </ThemeContextProvider>
    </React.StrictMode>,
);
