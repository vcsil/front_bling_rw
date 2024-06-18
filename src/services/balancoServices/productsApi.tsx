import api from "@/services/api";

import { BalanceProductT } from "@/pages/Balanco/types";

export async function getProduct(idDeposit: number, codeProduct: number): Promise<BalanceProductT> {
    const response = await api.get(`/products/balance/${idDeposit}/${codeProduct}`);

    return response.data as BalanceProductT;
}
