import api from "@/services/api";

import { BalanceProductT } from "@/pages/Balanco/types";

export async function getProduct(idDeposit: number, codeProduct: string): Promise<BalanceProductT> {
    const response = await api.get(`/products/balance/product/${idDeposit}/${codeProduct}`);

    return response.data as BalanceProductT;
}
