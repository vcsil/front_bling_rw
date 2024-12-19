import useAsync from "@/hooks/useAsync";

import * as productsApi from "@/services/productsServices/productsTotalAPI";

export default function useGetProductsTotal() {
    const {
        data: productsTotalQuantity,
        loading: productsTotalQuantityLoading,
        error: productsTotalQuantityError,
        act: getProductsTotalQuantity,
    } = useAsync(productsApi.getProductsTotalQuantity, false);

    return {
        productsTotalQuantity: productsTotalQuantity,
        productsTotalQuantityLoading,
        productsTotalQuantityError,
        getProductsTotalQuantity,
    };
}
