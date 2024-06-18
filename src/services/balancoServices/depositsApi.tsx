import api from "@/services/api";

import { DepositsT } from "@/pages/Balanco/types";

export async function getDeposits(): Promise<DepositsT[]> {
    const response = await api.get("/deposits");

    return response.data as DepositsT[];
}
