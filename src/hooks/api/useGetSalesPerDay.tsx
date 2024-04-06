import useAsync from "@/hooks/useAsync";

import * as orderSalesPerDayApi from "@/services/dashboardSevices/orderSalesPerDayApi";

export default function useGetSalesPerDay() {
    const {
        data: salesPerDay,
        loading: salesPerDayLoading,
        error: salesPerDayError,
        act: getSalesPerDay,
    } = useAsync(orderSalesPerDayApi.getOrderSalesPerDay, false);

    return {
        salesPerDay: salesPerDay ?? {},
        salesPerDayLoading,
        salesPerDayError,
        getSalesPerDay,
    };
}
