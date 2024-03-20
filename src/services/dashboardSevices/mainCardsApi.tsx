import { DateRangeMainCompare } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";
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

export async function getMainCards(dateRanges: DateRangeMainCompare): Promise<AllCardsReturnT> {
    const queryParams = {
        mainDateFrom: dateRanges.main.from.toJSON().split("T")[0],
        mainDateTo: dateRanges.main.to.toJSON().split("T")[0],
        compareDateFrom: dateRanges.compare.from.toJSON().split("T")[0],
        compareDateTo: dateRanges.compare.to.toJSON().split("T")[0],
    };

    const response = await api.get("/dashboard/main-cards", { params: queryParams });
    return response.data as AllCardsReturnT;
}
