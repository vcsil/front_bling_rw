import api from "@/services/api";

export async function getProductsTotalQuantity(idCategory: number | undefined): Promise<{ total: number }> {
    if (idCategory) {
        const queryParams = {
            idCategory,
        };
        const response = await api.get(`/products/total`, { params: queryParams });
        return response.data as { total: number };
    } else {
        const response = await api.get(`/products/total`);
        return response.data as { total: number };
    }
}
