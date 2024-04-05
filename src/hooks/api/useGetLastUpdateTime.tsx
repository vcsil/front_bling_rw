import useAsync from "@/hooks/useAsync";

import * as lastUpdateTimeApi from "@/services/dashboardSevices/lastUpdateTimeApi";

export default function useGetLastUpdateTime() {
    const {
        data: lastUpdateTime,
        loading: lastUpdateTimeLoading,
        error: lastUpdateTimeError,
        act: getLastUpdateTime,
    } = useAsync(lastUpdateTimeApi.getLastUpdateTime, true);

    return {
        lastUpdateTime: lastUpdateTime ?? new Date(),
        lastUpdateTimeLoading,
        lastUpdateTimeError,
        getLastUpdateTime,
    };
}
