import useAsync from "@/hooks/useAsync";

import * as balanceCompareApi from "@/services/balancoServices/balanceCompareApi";

export default function usePostBalanceCompare() {
    const {
        data: balanceCompare,
        loading: balanceCompareLoading,
        error: balanceCompareError,
        act: postBalanceCompare,
    } = useAsync(balanceCompareApi.postBalanceCompare, false);

    return {
        balanceCompare: balanceCompare,
        balanceCompareLoading,
        balanceCompareError,
        postBalanceCompare,
    };
}
