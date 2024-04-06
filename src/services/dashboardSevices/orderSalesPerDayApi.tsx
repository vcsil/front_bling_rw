import api from "@/services/api";

import { GetOrderSalesPerDayT } from "@/pages/Dashboard/Dashboard/types";
import { DateRange } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";

export async function getOrderSalesPerDay(dateRange: DateRange, situationsSales: string[]): Promise<GetOrderSalesPerDayT[]> {
    const queryParam = {
        from: dateRange.from.toJSON().split("T")[0],
        to: dateRange.to.toJSON().split("T")[0],
        situationsSales,
    };

    const response = await api.get("/dashboard/order-per-day", { params: queryParam });

    return response.data as GetOrderSalesPerDayT[];
}
