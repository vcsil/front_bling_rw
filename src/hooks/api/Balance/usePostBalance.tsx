import useAsync from "@/hooks/useAsync";

import * as balanceApi from "@/services/balancoServices/balanceSaveApi";

export default function usePostBalance() {
    const { data: balance, loading: balanceLoading, error: balanceError, act: postBalance } = useAsync(balanceApi.postBalance, false);

    return {
        balance: balance,
        balanceLoading,
        balanceError,
        postBalance,
    };
}
