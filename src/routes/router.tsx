import { Routes, Route } from "react-router-dom";

import DashboardPage from "@/pages/Dashboard/DashboarPage";
import { Layout } from "@/Layout";
import BalancoPage from "@/pages/Balanco/BalancoPage";
import CompareBalancePage from "@/pages/Balanco/CompareBalance/CompareBalance";
import CompareBalanceProducts from "@/pages/Balanco/CompareBalance/CompareBalance-Products";
import ProductsListPage from "@/pages/Products/ProductsListPage";

function AppRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />

                <Route path="/balanco" element={<BalancoPage />} />
                <Route path="/balanco/comparacoes" element={<CompareBalancePage />} />
                <Route path="/balanco/comparacoes/:idDeposit/:dateBalance" element={<CompareBalanceProducts />} />

                <Route path="/produtos" element={<ProductsListPage />} />
                <Route path="/produtos/categoria/:idCategory" element={<ProductsListPage />} />

                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </Layout>
    );
}

export default AppRoutes;
