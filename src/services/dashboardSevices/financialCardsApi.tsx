import api from "@/services/api";

import { FinancialCardsData, FinancialCardsProps } from "@/pages/Dashboard/Dashboard/types";
import { formatDataToString } from "../utils";

export async function getFinancialCardsPerPeriod({ rangeDateMain, rangeDateCompare }: FinancialCardsProps): Promise<FinancialCardsData[]> {
    const queryParam = {
        mainDateFrom: formatDataToString(rangeDateMain.from),
        mainDateTo: formatDataToString(rangeDateMain.to),
        compareDateFrom: formatDataToString(rangeDateCompare.from),
        compareDateTo: formatDataToString(rangeDateCompare.to),
    };

    const response = await api.get("/dashboard/revenue-cards", { params: queryParam });

    return response.data as FinancialCardsData[];
}
