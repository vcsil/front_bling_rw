import { Routes, Route } from "react-router-dom";

import DashboardPage from "@/pages/Dashboard/DashboarPage";
import IndexPage from "@/pages/Index/IndexPage";
import MailPage from "@/pages/Teste/page";
import { Layout } from "@/Layout";

function AppRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route
                    path="/teste"
                    element={
                        <div className="overflow-hidden rounded-lg border bg-background shadow-lg">
                            <MailPage />
                        </div>
                    }
                />
                <Route path="/teste2" element={<h1>Oi</h1>} />
                <Route path="/dashboard" element={<DashboardPage />} />

                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </Layout>
    );
}

export default AppRoutes;
