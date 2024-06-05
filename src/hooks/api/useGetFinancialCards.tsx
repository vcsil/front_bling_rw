import useAsync from "@/hooks/useAsync";

import * as financialCardsApi from "@/services/dashboardSevices/financialCardsApi";

export default function useGetFinancialCards() {
    const {
        data: financialCards,
        loading: financialCardsLoading,
        error: financialCardsError,
        act: getFinancialCards,
    } = useAsync(financialCardsApi.getFinancialCardsPerPeriod, false);

    return {
        financialCards: financialCards,
        financialCardsLoading,
        financialCardsError,
        getFinancialCards,
    };
}
