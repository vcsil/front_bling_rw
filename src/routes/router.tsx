import { Routes, Route } from "react-router-dom";

import DashboardPage from "@/pages/Dashboard/DashboarPage";
import IndexPage from "@/pages/Index/IndexPage";
import { Layout } from "@/Layout";
import BalancoPage from "@/pages/Balanco/BalancoPage";
import CompareBalancePage from "@/pages/Balanco/CompareBalance/CompareBalance";
import CompareBalanceProducts from "@/pages/Balanco/CompareBalance/CompareBalance-Products";

function AppRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/balanco" element={<BalancoPage />} />
                <Route path="/balanco/compare" element={<CompareBalancePage />} />
                <Route path="/balanco/compare/:idDeposit/:dateBalance" element={<CompareBalanceProducts />} />

                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </Layout>
    );
}

export default AppRoutes;
