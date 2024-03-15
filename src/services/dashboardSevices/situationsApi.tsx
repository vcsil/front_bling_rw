import api from "@/services/api";

import SituationsT from "@/pages/Dashboard/Dashboard/multi-select/type";

export async function getSalesSituations(): Promise<SituationsT[]> {
    const response = await api.get("/dashboard/situations");
    return response.data as SituationsT[];
}
