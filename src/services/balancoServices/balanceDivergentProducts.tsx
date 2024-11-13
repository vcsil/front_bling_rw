import api from "@/services/api";

import { DivergentroductsT } from "@/pages/Balanco/types";

export async function getDivergentProducts(idDeposit: number, dateBalance: Date): Promise<DivergentroductsT[]> {
    const response = await api.get(`/products/balance/divergences/${idDeposit}/${String(dateBalance)}`);

    return response.data as DivergentroductsT[];
}
