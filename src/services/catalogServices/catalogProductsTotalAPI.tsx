import api from "@/services/api";

export async function getCatalogProductsTotalQuantity(
    idDeposit: number,
    idCategory: number | undefined,
    text = "",
): Promise<{ total: number }> {
    if (idCategory && text) {
        const queryParams = {
            idCategory,
            text,
        };

        const response = await api.get(`/products/catalog/total/${idDeposit}`, { params: queryParams });
        return response.data as { total: number };
    } else if (idCategory) {
        const queryParams = {
            idCategory,
        };

        const response = await api.get(`/products/catalog/total/${idDeposit}`, { params: queryParams });
        return response.data as { total: number };
    } else if (text) {
        const queryParams = {
            text,
        };

        const response = await api.get(`/products/catalog/total/${idDeposit}`, { params: queryParams });
        return response.data as { total: number };
    } else {
        const response = await api.get(`/products/catalog/total/${idDeposit}`);
        return response.data as { total: number };
    }
}
