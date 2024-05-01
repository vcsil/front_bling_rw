import api from "@/services/api";

import { GetOrderSalesPerDayT } from "@/pages/Dashboard/Dashboard/types";
import { DateRange } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";
import { formatDataToString } from "../utils";

export async function getOrderSalesPerDay(dateRange: DateRange, situationsSales: string[]): Promise<GetOrderSalesPerDayT[]> {
    const queryParam = {
        from: formatDataToString(dateRange.from),
        to: formatDataToString(dateRange.to),
        situationsSales,
    };

    const response = await api.get("/dashboard/order-per-day", { params: queryParam });

    return response.data as GetOrderSalesPerDayT[];
}
