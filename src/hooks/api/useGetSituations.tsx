import useAsync from "@/hooks/useAsync";

import * as situationsApi from "@/services/dashboardSevices/situationsApi";

export default function useGetSituationsSales() {
    const { data: situationsList, loading: situationsLoading, error: situationsError } = useAsync(situationsApi.getSalesSituations);

    return {
        situationsList: situationsList ?? [],
        situationsLoading,
        situationsError,
    };
}
