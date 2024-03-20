import { GetMainCardsProps } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";
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
        mainDateFrom: cardsProps.main.from.toJSON().split("T")[0],
        mainDateTo: cardsProps.main.to.toJSON().split("T")[0],
        compareDateFrom: cardsProps.compare.from.toJSON().split("T")[0],
        compareDateTo: cardsProps.compare.to.toJSON().split("T")[0],
        situationsSales: cardsProps.situationsSales,
    };

    const response = await api.get("/dashboard/main-cards", { params: queryParams });
    return response.data as AllCardsReturnT;
}
