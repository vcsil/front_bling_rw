import api from "@/services/api";

import { GetProductsListProps, OrderT, ProductsListT } from "@/pages/Products/types";

export async function getCatalogList({ page, take, orderKey }: GetProductsListProps): Promise<ProductsListT[]> {
    const idCategoryURI = "";
    const idDeposit = 14886831043;
    const order = ["latest", "oldest", "lowestPrice", "highestPrice"][orderKey] as OrderT;

    const queryParams = {
        page,
        take,
        order,
    };

    const response = await api.get(`/products/catalog/list/${idDeposit}/${idCategoryURI}`, { params: queryParams });

    return response.data as ProductsListT[];
}
