import useAsync from "@/hooks/useAsync";

import * as productsApi from "@/services/balancoServices/balanceProductsApi";

export default function useGetProduct() {
    const { data: product, loading: productLoading, error: productError, act: getProduct } = useAsync(productsApi.getProduct, false);

    return {
        product: product,
        productLoading,
        productError,
        getProduct,
    };
}
