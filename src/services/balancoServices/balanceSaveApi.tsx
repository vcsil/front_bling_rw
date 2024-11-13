import { ConferenceProductsT } from "@/pages/Balanco/types";
import api from "@/services/api";

export async function postBalance(data: ConferenceProductsT) {
    const response = await api.post("/products/balance/save", data);

    return response.data as string;
}
