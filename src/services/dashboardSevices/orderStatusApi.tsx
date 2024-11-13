import api from "@/services/api";

import { OrderStatusTotal } from "@/pages/Dashboard/Dashboard/types";
import { DateRange } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";
import { formatDataToString } from "@/services/utils";

export async function getOrderStatusPerPeriod(dateRange: DateRange): Promise<OrderStatusTotal> {
    const queryParam = {
        from: formatDataToString(dateRange.from),
        to: formatDataToString(dateRange.to),
    };

    const response = await api.get("/dashboard/order-status", { params: queryParam });

    return response.data as OrderStatusTotal;
}
