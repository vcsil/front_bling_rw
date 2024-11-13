import useAsync from "@/hooks/useAsync";

import * as depositsDayDepositsApi from "@/services/balancoServices/balancesDayDepositsApi";

export default function useGetBalancesDayDeposits() {
    const {
        data: balancesDayDeposits,
        loading: balancesDayDepositsLoading,
        error: balancesDayDepositsError,
        act: getBalancesDayDeposits,
    } = useAsync(depositsDayDepositsApi.getBalancesDayDeposits, true);

    return {
        balancesDayDeposits: balancesDayDeposits,
        balancesDayDepositsLoading,
        balancesDayDepositsError,
        getBalancesDayDeposits,
    };
}
