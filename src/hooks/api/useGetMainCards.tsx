import useAsync from "@/hooks/useAsync";

import * as mainCardsApi from "@/services/dashboardSevices/mainCardsApi";

export default function useGetMainCards() {
    const {
        data: mainCards,
        loading: mainCardsLoading,
        error: mainCardsError,
        act: getMainCards,
    } = useAsync(mainCardsApi.getMainCards, false);

    return {
        mainCards: mainCards ?? {},
        mainCardsLoading,
        mainCardsError,
        getMainCards,
    };
}
