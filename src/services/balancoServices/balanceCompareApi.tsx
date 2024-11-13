import api from "@/services/api";

export async function postBalanceCompare(idDeposit: number) {
    const response = await api.post(`/products/balance/compare/${idDeposit}`);

    return response.data as string;
}
