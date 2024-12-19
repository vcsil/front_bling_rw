import api from "@/services/api";

import { DivergentProductsT } from "@/pages/Balanco/types";

export async function getDivergentProducts(idDeposit: number, dateBalance: Date): Promise<DivergentProductsT[]> {
    const response = await api.get(`/products/balance/divergences/${idDeposit}/${String(dateBalance)}`);

    return response.data as DivergentProductsT[];
}
