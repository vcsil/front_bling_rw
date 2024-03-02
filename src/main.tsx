import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@/components/theme-provider";
import "@/shared/styles/global.css";
import App from "@/app/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ThemeProvider>,
);
