import useAsync from "@/hooks/useAsync";

import * as depositsApi from "@/services/balancoServices/depositsApi";

export default function useGetDeposits() {
    const { data: deposits, loading: depositsLoading, error: depositsError, act: getDeposits } = useAsync(depositsApi.getDeposits, true);

    return {
        deposits: deposits,
        depositsLoading,
        depositsError,
        getDeposits,
    };
}
