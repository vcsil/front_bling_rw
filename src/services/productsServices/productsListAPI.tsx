import api from "@/services/api";

import { GetProductsListProps, OrderT, ProductsListT } from "@/pages/Products/types";

export async function getProductsList({ idDeposit, idCategory, page, take, orderKey }: GetProductsListProps): Promise<ProductsListT[]> {
    const idCategoryURI = idCategory || "";
    const order = ["latest", "oldest", "lowestPrice", "highestPrice"][orderKey] as OrderT;

    const queryParams = {
        page,
        take,
        order,
    };

    const response = await api.get(`/products/list/${idDeposit}/${idCategoryURI}`, { params: queryParams });

    return response.data as ProductsListT[];
}
