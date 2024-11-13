import api from "@/services/api";

import { AllBalancePerDayDepositT } from "@/pages/Balanco/types";

export async function getBalancesDayDeposits(): Promise<AllBalancePerDayDepositT[]> {
    const response = await api.get("/products/balance/balances");

    return response.data as AllBalancePerDayDepositT[];
}
