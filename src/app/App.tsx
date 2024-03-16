import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "@/routes/router";
import { DashboardProvider } from "@/hooks/useDashboard";

export default function App() {
    return (
        <DashboardProvider>
            <Router>
                <AppRoutes />
            </Router>
        </DashboardProvider>
    );
}
