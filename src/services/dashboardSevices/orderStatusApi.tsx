import api from "@/services/api";

import { OrderStatusTotal } from "@/pages/Dashboard/Dashboard/types";
import { DateRange } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";

export async function getOrderStatusPerPeriod(dateRange: DateRange): Promise<OrderStatusTotal> {
    const queryParam = {
        from: dateRange.from.toJSON().split("T")[0],
        to: dateRange.to.toJSON().split("T")[0],
    };

    const response = await api.get("/dashboard/order-status", { params: queryParam });

    return response.data as OrderStatusTotal;
}
