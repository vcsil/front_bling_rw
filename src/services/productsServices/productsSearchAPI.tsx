import api from "@/services/api";

import { GetProductsListProps, OrderT, ProductsListT } from "@/pages/Products/types";

export async function getSearchProducts({
    idDeposit,
    idCategory,
    page,
    take,
    orderKey,
    text,
}: GetProductsListProps & { text: string }): Promise<ProductsListT[]> {
    const idCategoryURI = idCategory || "";
    const order = ["latest", "oldest", "lowestPrice", "highestPrice"][orderKey] as OrderT;

    const queryParams = {
        page,
        take,
        order,
        text,
    };

    const response = await api.get(`/products/search/${idDeposit}/${idCategoryURI}`, { params: queryParams });

    return response.data as ProductsListT[];
}
