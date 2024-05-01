import { GetMainCardsProps } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";
import { formatDataToString } from "../utils";
import api from "@/services/api";

interface MainCardsReturnT {
    amount: number;
    oldAmount: number;
    percent: number;
}

interface AllCardsReturnT {
    salesOrdersQuantity: MainCardsReturnT;
    productsSoldQuantity: MainCardsReturnT;
    amountInvoiced: MainCardsReturnT;
    averageTicket: MainCardsReturnT;
}

export async function getMainCards(cardsProps: GetMainCardsProps): Promise<AllCardsReturnT> {
    const queryParams = {
        mainDateFrom: formatDataToString(cardsProps.main.from),
        mainDateTo: formatDataToString(cardsProps.main.to),
        compareDateFrom: formatDataToString(cardsProps.compare.from),
        compareDateTo: formatDataToString(cardsProps.compare.to),
        situationsSales: cardsProps.situationsSales,
    };

    const response = await api.get("/dashboard/main-cards", { params: queryParams });
    return response.data as AllCardsReturnT;
}
