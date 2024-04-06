import useAsync from "@/hooks/useAsync";

import * as orderStatusApi from "@/services/dashboardSevices/orderStatusApi";

export default function useGetOrderStatus() {
    const {
        data: orderStatus,
        loading: orderStatusLoading,
        error: orderStatusError,
        act: getOrderStatus,
    } = useAsync(orderStatusApi.getOrderStatusPerPeriod, false);

    return {
        orderStatus: orderStatus,
        orderStatusLoading,
        orderStatusError,
        getOrderStatus,
    };
}
